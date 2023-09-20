import MainContainer from "@/shared/components/main-container";
import { PufiFormControlLabel, SurveyContainer } from "./styled";
import { useContext, useEffect, useState } from "react";
import SurveyProvider, { SurveyContext } from "./context";
import { youngChildSurvey } from "@/utils/youngChildSurvey";
import { StyledFormControlLabel } from "./components/option/styled";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { isNullOrUndefined } from "@/utils/utils";
import { youngChildActivity } from "@/utils/youngChildActivity";

const SurveyContent = () => {
  const { currentQuestionIndex, currentAnswer, updateAnswer } =
    useContext(SurveyContext);
  const currentActivity = youngChildActivity[currentQuestionIndex];
  const [steps, setSteps] = useState();

  const getResponseForQuestion = (questionId) => {
    // const responses = currentAnswer.find(
    //   (answer) => answer.activityId === currentActivity.id
    // ).responses;
    return currentAnswer?.responses.find((response) => {
      return response.questionId === questionId;
    });
  };

  const checkIfResponseIsValid = ({ questionId, response }) => {
    switch (questionId) {
      case "do":
        //do is valid if there is an answer
        if (!isNullOrUndefined(response.value)) {
          return {
            answered: true,
            response,
          };
        } else {
          return {
            answered: false,
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
                answered: true,
                response,
              };
            } else {
              return {
                answered: false,
              };
            }
          }
          if (response.value === 0) {
            if (response.commentForNotSure) {
              return {
                answered: true,
                response,
              };
            } else {
              return {
                answered: false,
              };
            }
          }
          return {
            answered: true,
            response,
          };
        } else {
          return {
            answered: false,
          };
        }
        break;
      case "well":
        if (!isNullOrUndefined(response.value)) {
          return {
            answered: true,
            response,
          };
        } else {
          return {
            answered: false,
          };
        }
        break;
      case "useful":
        if (!isNullOrUndefined(response.value)) {
          return {
            answered: true,
            response,
          };
        } else {
          return {
            answered: false,
          };
        }
        break;
      case "without":
        if (!isNullOrUndefined(response.value)) {
          return {
            answered: true,
            response,
          };
        } else {
          return {
            answered: false,
          };
        }
        break;
    }
  };

  console.log(" 1 Current Answer = ", currentAnswer);
  useEffect(() => {
    if (currentAnswer) {
      const steps = youngChildSurvey.map((surveyQuestion) => {
        const response = getResponseForQuestion(surveyQuestion.questionId);
        const checkedResponse = checkIfResponseIsValid(response);

        return {
          ...surveyQuestion,
          checkedResponse,
        };
      });
      console.log("Steps == ", steps);
      setSteps(steps);
    }
  }, [currentAnswer]);

  const isStepVisible = (step, index) => {
    if (index === 0) return true;
  };

  console.log("Steps == ", steps);

  return (
    <MainContainer>
      <SurveyContainer>
        <Stepper orientation="vertical">
          {steps?.map((step, index) => {
            return (
              <Step active={step.checkedResponse.answered || index === 0}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <RadioGroup name="radio-buttons-group">
                    {step.options.map((option) => {
                      return (
                        <PufiFormControlLabel
                          value={option.value}
                          control={<Radio />}
                          name={`radio-buttons-${option.questionId}`}
                          label={option.label}
                          onClick={() => {
                            updateAnswer(step.questionId, option.value);
                          }}
                        />
                      );
                    })}
                  </RadioGroup>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
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
