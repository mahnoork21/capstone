import MainContainer from "@/shared/components/main-container";
import {
  BodyPartInputContainer,
  PufiFormControlLabel,
  StyledStepper,
  StyledTextField,
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
} from "@mui/material";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import Image from "next/image";
import { checkIfResponseIsValid } from "./helper/surveyHelper";
import { questionIds, youngChildSurvey } from "./helper/youngChildSurvey";
import { getSurveyById, updateAnswerInSurvey } from "@/firebase/surveyRepo";
import ActivityInfoHeading from "./components/activity-info-heading";
import InfoToUser from "./components/info-component";

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

  // const getResponseForQuestion = (questionId) => {
  //   return currentAnswer
  //     ? currentAnswer.responses.find((response) => {
  //         return response.questionId === questionId;
  //       })
  //     : null;
  // };

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

    //Check if last question is valid.
    const prevQuestionId = youngChildSurvey[index - 1].questionId;
    const response = currentAnswer[prevQuestionId];
    const checkedResponse = checkIfResponseIsValid(prevQuestionId, response);

    //Checks if user selected don't know in previous answer
    const visibleWhen = youngChildSurvey[index].visibleWhen;
    const shouldShowCurrentStep = visibleWhen.optionValue?.includes(
      currentAnswer[visibleWhen.questionId].value
    );

    //any question after well should be inactive if how response becomes invalid
    const isHowResponseValue =
      index > 2
        ? checkIfResponseIsValid("how", currentAnswer.how).isAnswered
        : true;

    return (
      checkedResponse.isAnswered && shouldShowCurrentStep && isHowResponseValue
    );
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
        <ActivityInfoHeading
          currentActivityIndex={currentActivityIndex}
          activityLabel={currentActivity?.label}
        />
        <StyledStepper key={currentActivity?.id} orientation="vertical">
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
                              updateAnswer(step.questionId, value, "value");
                            }}
                          />
                        );
                      }
                    )}
                  </RadioGroup>
                  {step.questionId === "how" &&
                    currentAnswer.how.value === 3 && (
                      <>
                        <StyledTextField
                          id="bodypart-input"
                          label={
                            youngChildSurvey[1].options[2]
                              .additionalResponseIfSelected.hint
                          }
                          variant="filled"
                          value={currentAnswer.how.bodypart}
                          onChange={(event) => {
                            updateAnswer(
                              step.questionId,
                              event.target.value,
                              "body-part"
                            );
                          }}
                        />
                        <InfoToUser
                          message={
                            youngChildSurvey[1].options[2]
                              .additionalResponseIfSelected.info
                          }
                          questionId={step.questionId}
                          fillWidth={false}
                        />
                      </>
                    )}
                  {step.questionId === "do" && currentAnswer.do.value === 1 && (
                    <InfoToUser
                      message={youngChildSurvey[0].options[1].messageIfSelected}
                      fillWidth
                      questionId={step.questionId}
                    />
                  )}
                  {step.questionId !== "do" && (
                    <>
                      <StyledTextField
                        style={{ marginTop: 12 }}
                        id="comment-input"
                        label="Comments"
                        variant="filled"
                        multiline
                        value={currentAnswer[step.questionId].comment}
                        onChange={(event) => {
                          updateAnswer(
                            step.questionId,
                            event.target.value,
                            "comment"
                          );
                        }}
                      />
                      <InfoToUser
                        message={youngChildSurvey[stepIndex]?.comment?.hint}
                        fillWidth
                        questionId={step.questionId}
                      />
                    </>
                  )}
                </StepContent>
              </Step>
            );
          })}
        </StyledStepper>

        <div>
          {currentActivityIndex !== 0 && (
            <Button variant="outlined" onClick={handleOnBackButtonClicked}>
              Back
            </Button>
          )}
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
