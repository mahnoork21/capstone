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
import Image from "next/image";
import { checkIfResponseIsValid } from "./helper/surveyHelper";
import { youngChildSurvey } from "./helper/youngChildSurvey";
import axios from "axios";
import { getSurveyById, updateAnswerInSurvey } from "@/firebase/surveyRepo";

const SurveyContent = () => {
  const {
    currentActivityIndex,
    currentAnswer,
    currentSurveyId,
    setCurrentActivityIndex,
    updateAnswer,
    setSurveyResponse,
  } = useContext(SurveyContext);
  const currentActivity = youngChildActivity[currentActivityIndex];
  const [steps, setSteps] = useState();

  const isDoMessageVisible = currentAnswer
    ? currentAnswer.do.value === 1
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
        // const response = getResponseForQuestion(surveyQuestion.questionId);
        const response = currentAnswer[surveyQuestion.questionId];
        const checkedResponse = checkIfResponseIsValid(
          surveyQuestion.questionId,
          response
        );

        if (
          surveyQuestion.questionId === "do" &&
          currentAnswer.do.value === 1
        ) {
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

    // const response = getResponseForQuestion(prevQuestionId);
    const response = currentAnswer[prevQuestionId];
    const checkedResponse = checkIfResponseIsValid(prevQuestionId, response);

    return checkedResponse.isAnswered;
  };

  const getSavedAnswer = (questionId) => {
    // console.log("Question id === ", questionId);
    return currentAnswer[questionId].value;
  };

  const handleOnNextButtonClicked = async () => {
    for (const [questionId, response] of Object.entries(currentAnswer)) {
      const result = checkIfResponseIsValid(questionId, response);
      if (!result.isAnswered) {
        //Display error message and scroll to the error question
        console.log("Question Not answered", response.questionId);
        return;
      }
    }
    //All questions are valid and have answers

    //If user updated the answer update in db

    try {
      await updateAnswerInSurvey(
        youngChildActivity[currentActivityIndex].id,
        currentAnswer
      );
      //update the local copy
      const survey = await getSurveyById(currentSurveyId);
      setSurveyResponse(survey.activity_response);

      setCurrentActivityIndex(currentActivityIndex + 1);
    } catch (error) {
      console.log(
        `Error in ${process.env.NEXT_PUBLIC_SURVEY_UPDATE_RESPONSES}`,
        error
      );
      return;
    }

    setCurrentActivityIndex(currentActivityIndex + 1);
  };

  const handleOnBackButtonClicked = () => {
    //check if answer is updated
    //if updated -> update server

    setCurrentActivityIndex(currentActivityIndex - 1);
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
                    value={getSavedAnswer(step.questionId)}
                  >
                    {step.options.map(
                      ({ questionId, value, label }, optionIndex) => {
                        return (
                          <PufiFormControlLabel
                            checked={getSavedAnswer(step.questionId) == value}
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
