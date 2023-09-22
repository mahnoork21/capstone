import MainContainer from "@/shared/components/main-container";
import {
  PufiFormControlLabel,
  SurveyContainer,
  UserMessageWrapper,
} from "./styled";
import { useContext, useEffect, useState } from "react";
import SurveyProvider, { SurveyContext } from "./context";
import { questionIds, youngChildSurvey } from "@/utils/youngChildSurvey";
import { StyledFormControlLabel } from "./components/option/styled";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  SvgIcon,
} from "@mui/material";
import { isNullOrUndefined } from "@/utils/utils";
import { youngChildActivity } from "@/utils/youngChildActivity";
import {
  getLastAnsweredIndex,
  incrementLastAnsweredIndex,
  updateAnswerForIndex,
} from "@/utils/localStorageUtils";
import Image from "next/image";

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

  const checkIfResponseIsValid = ({ questionId, response }) => {
    switch (questionId) {
      case "do":
        //do is valid if there is an answer
        if (!isNullOrUndefined(response.value)) {
          return {
            isAnswered: true,
            response,
          };
        } else {
          return {
            isAnswered: false,
          };
        }
        break;
      case "how":
        //how is valid if it has value, if value is 3 bodypart input is given
        //if value is 0, required comment is given
        if (!isNullOrUndefined(response.value)) {
          if (response.value === 3) {
            //TODO check for empty
            if (response.bodypart) {
              return {
                isAnswered: true,
                response,
              };
            } else {
              return {
                isAnswered: false,
              };
            }
          }
          if (response.value === 0) {
            if (response.commentForNotSure) {
              return {
                isAnswered: true,
                response,
              };
            } else {
              return {
                isAnswered: false,
              };
            }
          }
          return {
            isAnswered: true,
            response,
          };
        } else {
          return {
            isAnswered: false,
          };
        }
        break;
      case "well":
        if (!isNullOrUndefined(response.value)) {
          return {
            isAnswered: true,
            response,
          };
        } else {
          return {
            isAnswered: false,
          };
        }
        break;
      case "useful":
        if (!isNullOrUndefined(response.value)) {
          return {
            isAnswered: true,
            response,
          };
        } else {
          return {
            isAnswered: false,
          };
        }
        break;
      case "without":
        if (!isNullOrUndefined(response.value)) {
          return {
            isAnswered: true,
            response,
          };
        } else {
          return {
            isAnswered: false,
          };
        }
        break;
    }
  };

  useEffect(() => {
    console.log(" ** Updating steps ** ");
    if (currentAnswer) {
      const steps = youngChildSurvey
        .map((surveyQuestion) => {
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
        })
        .flat();
      setSteps(steps);
    }
  }, [currentAnswer]);

  const isStepVisible = (index) => {
    if (index === 0) return true;

    const prevQuestionId = youngChildSurvey[index - 1].questionId;

    const response = getResponseForQuestion(prevQuestionId);
    const checkedResponse = checkIfResponseIsValid(response);

    return checkedResponse.isAnswered;
  };

  const getSavedAnswer = (index) => {
    console.log(
      "** Saved Answer, index = ",
      index,
      " Value = ",
      currentAnswer.responses[index].response.value
    );
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
    // currentAnswer.responses.forEach((response) => {});
    //All questions are valid and have answers

    //save to local storage
    updateAnswerForIndex(
      currentUserId,
      currentSurveyId,
      currentQuestionIndex,
      currentAnswer
    );

    //TODO also check if an empty response is already genereated
    if (getLastAnsweredIndex() === currentQuestionIndex - 1) {
      console.log(
        "++ Incrementing answered index ++ LastAnswered index",
        getLastAnsweredIndex(),
        " current = " + (currentQuestionIndex - 1)
      );
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

  const firstStep = steps ? steps[0] : null;

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
