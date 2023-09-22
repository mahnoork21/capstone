import MainContainer from "@/shared/components/main-container";
import {
  PufiFormControlLabel,
  SurveyContainer,
  UserMessageWrapper,
} from "./styled";
import { useContext, useEffect, useState } from "react";
import SurveyProvider, { SurveyContext } from "./context";
import {
  Button,
  Radio,
  RadioGroup,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import {
  getLastAnsweredIndex,
  incrementLastAnsweredIndex,
  updateAnswerForIndex,
} from "@/utils/localStorageUtils";
import Image from "next/image";
import { checkIfResponseIsValid } from "./helper/surveyHelper";
import { youngChildSurvey } from "./helper/youngChildSurvey";

const SurveyContent = () => {
  const {
    currentQuestionIndex,
    currentAnswer,
    updateAnswer,
    currentUserId,
    currentSurveyId,
    setCurrentQuestionIndex,
  } = useContext(SurveyContext);
  const currentActivity = youngChildActivity[currentQuestionIndex];
  const [steps, setSteps] = useState();

  const isDoMessageVisible = currentAnswer
    ? currentAnswer.responses[0].response.value === 1
    : false;

  const getResponseForQuestion = (questionId) => {
    return currentAnswer
      ? currentAnswer.responses.find((response) => {
          return response.questionId === questionId;
        })
      : null;
  };

  //Generates steps to be used in Stepper
  useEffect(() => {
    if (currentAnswer) {
      const steps = youngChildSurvey.map((surveyQuestion) => {
        const response = getResponseForQuestion(surveyQuestion.questionId);
        const checkedResponse = checkIfResponseIsValid(response);

        if (surveyQuestion.questionId === "do" && isDoMessageVisible) {
          return {
            ...surveyQuestion,
            checkedResponse,
            messageIfSelected: surveyQuestion.options[1].messageIfSelected,
          };
        }

        return {
          ...surveyQuestion,
          checkedResponse,
        };
      });
      setSteps(steps);
    }
  }, [currentAnswer]);

  const isStepVisible = (index) => {
    //First question is always visible
    if (index === 0) return true;

    const prevQuestionId = youngChildSurvey[index - 1].questionId;

    const response = getResponseForQuestion(prevQuestionId);
    const checkedResponse = checkIfResponseIsValid(response);

    return checkedResponse.isAnswered;
  };

  const getSavedAnswer = (index) => {
    return currentAnswer.responses[index].response.value;
  };

  const handleOnNextButtonClicked = () => {
    for (const response of currentAnswer.responses) {
      const result = checkIfResponseIsValid(response);
      if (!result?.isAnswered) {
        //Display error message and scroll to the error question
        console.log("Question Not answered", response.questionId);
        return;
      }
    }
    //All questions are valid and have answers

    //save to local storage
    updateAnswerForIndex(
      currentUserId,
      currentSurveyId,
      currentQuestionIndex,
      currentAnswer
    );

    /**
     * TODO also check if an empty response is already genereated
     *
     * Increment lastAnsweredIndex only next activity is not answered
     * If user goes back a couple of activity and clicks next, don't update
     * the lastAnsweredIndex in localStorage
     */

    if (getLastAnsweredIndex() === currentQuestionIndex - 1) {
      incrementLastAnsweredIndex(currentUserId, currentSurveyId);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleOnBackButtonClicked = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  console.log("Activity == ", currentActivity);
  console.log("Steps == ", steps);
  console.log("Current Answer", currentAnswer);

  return (
    <MainContainer>
      <SurveyContainer isDoMessageVisible={Boolean(isDoMessageVisible)}>
        <h1>{currentActivity?.label} </h1>
        <Stepper key={currentActivity?.id} orientation="vertical">
          {steps?.map((step, stepIndex) => {
            return (
              <Step
                className={step.questionId}
                active={isStepVisible(stepIndex)}
              >
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <RadioGroup
                    name={`radio-buttons-group-${step.questionId}`}
                    value={getSavedAnswer(stepIndex)}
                  >
                    {step.options.map(
                      ({ questionId, value, label }, optionIndex) => {
                        return (
                          <PufiFormControlLabel
                            checked={getSavedAnswer(stepIndex) == value}
                            key={`${step.questionId}${optionIndex}`}
                            value={value}
                            control={<Radio />}
                            name={`radio-buttons-${questionId}`}
                            label={label}
                            onClick={() => {
                              updateAnswer(step.questionId, value);
                            }}
                          />
                        );
                      }
                    )}
                  </RadioGroup>
                  {step.messageIfSelected && (
                    <UserMessageWrapper>
                      <Image width={32} height={32} src="/icons/info.svg" />
                      <p>{step.messageIfSelected}</p>
                    </UserMessageWrapper>
                  )}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>

        <div>
          <Button variant="outlined" onClick={handleOnBackButtonClicked}>
            Back
          </Button>
          <Button variant="outlined" onClick={handleOnNextButtonClicked}>
            Next
          </Button>
        </div>
      </SurveyContainer>
    </MainContainer>
  );
};

const Survey = () => {
  return (
    <SurveyProvider>
      <SurveyContent />
    </SurveyProvider>
  );
};

export default Survey;
