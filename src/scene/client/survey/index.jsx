import MainContainer from "@/shared/components/main-container";
import {
  PufiFormControlLabel,
  StyledStepper,
  StyledTextField,
  SurveyContainer,
} from "./styled";
import { useContext, useEffect, useRef, useState } from "react";
import SurveyProvider, { SurveyContext } from "./context";
import {
  Button,
  Popover,
  Radio,
  RadioGroup,
  Step,
  StepContent,
  StepLabel,
} from "@mui/material";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import { checkIfResponseIsValid } from "./helper/surveyHelper";
import { questionIds, youngChildSurvey } from "./helper/youngChildSurvey";
import { getSurveyById, updateAnswerInSurvey } from "@/firebase/surveyRepo";
import ActivityInfoHeading from "./components/activity-info-heading";
import MessageToUser from "./components/info-component";
import ActivityQuestion from "./components/activity-question";
import Option from "./components/option";

const SurveyContent = () => {
  const {
    currentActivityIndex,
    currentAnswer,
    currentSurveyId,
    setCurrentActivityIndex,
    updateAnswer,
    setSurveyResponse,
    errors,
    setErrors,
  } = useContext(SurveyContext);
  const currentActivity = youngChildActivity[currentActivityIndex];
  const [steps, setSteps] = useState();

  const noResponseRef = useRef();
  const bodyPartRef = useRef();
  const notsureRef = useRef();

  const [activityGuideAnchorEL, setActivityGuideAnchorEL] = useState(null);
  const [isActivityGuide, setIsActivityGuide] = useState(true);

  const [miniGuideAnchorEl, setMiniGuideAnchorEL] = useState(null);
  const [miniGuideInfo, setMiniGuideInfo] = useState(null);

  const isDoMessageVisible = currentAnswer
    ? currentAnswer.do.value === 1
    : false;

  //Generates steps to be used in Stepper
  useEffect(() => {
    if (currentAnswer) {
      const steps = youngChildSurvey.map((surveyQuestion) => {
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
    return currentAnswer[questionId].value;
  };

  const handleOnNextButtonClicked = async () => {
    for (const questionId of questionIds) {
      const response = currentAnswer[questionId];
      const result = checkIfResponseIsValid(questionId, response);
      if (!result.isAnswered) {
        //Display error message and scroll to the error question
        setErrors({
          [questionId]: result.error,
        });
        return;
      } else {
        if (
          (questionId === "do" && currentAnswer.do.value === 0) ||
          (questionId === "how" && currentAnswer.how.value === 0)
        ) {
          break;
        }
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

  const handleOnResponseGuideClick = (event, isActivityGuide) => {
    setActivityGuideAnchorEL(event.currentTarget);
    setIsActivityGuide(isActivityGuide);
  };

  const handleOnActivityClose = () => {
    setActivityGuideAnchorEL(null);
  };

  const handleOnMiniGuideClick = (event, info) => {
    setMiniGuideAnchorEL(event.currentTarget);
    setMiniGuideInfo(info);
  };

  const handleOnMiniGuideClose = () => {
    setMiniGuideAnchorEL(null);
  };

  console.log("Activity == ", currentActivity);
  console.log("Steps == ", steps);
  console.log("Current Answer", currentAnswer);
  console.log("Current erro", errors);

  useEffect(() => {
    //assumes that there can be only one error at a time
    const error = Object.values(errors)[0];
    console.log("Curreint error ==>", error);
    switch (error) {
      case "no-response":
        noResponseRef.current?.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case "no-bodypart":
        console.log(bodyPartRef);
        bodyPartRef.current?.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case "no-commentForNotSure":
        notsureRef.current?.scrollIntoView({
          behavior: "smooth",
        });
    }
  }, [errors]);

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
                <StepLabel>
                  <ActivityQuestion
                    label={step.label}
                    questionId={step.questionId}
                    isActive={isStepVisible(stepIndex)}
                    handleOnResponseGuideClick={handleOnResponseGuideClick}
                  />
                </StepLabel>
                <StepContent>
                  {errors[step.questionId] === "no-response" ? (
                    <MessageToUser
                      type="error"
                      message={"Please select a response"}
                      ref={noResponseRef}
                    />
                  ) : (
                    ""
                  )}
                  <RadioGroup
                    name={`radio-buttons-group-${step.questionId}`}
                    value={getSavedAnswer(step.questionId)}
                  >
                    {step.options.map(
                      ({ questionId, value, label }, optionIndex) => {
                        return (
                          <Option
                            checked={getSavedAnswer(step.questionId) == value}
                            value={value}
                            control={<Radio />}
                            name={`radio-buttons-${questionId}`}
                            label={label}
                            updateAnswer={updateAnswer}
                            questionId={step.questionId}
                            handleOnMiniGuideClick={handleOnMiniGuideClick}
                          />
                        );
                      }
                    )}
                  </RadioGroup>
                  {step.questionId === "do" && currentAnswer.do.value === 1 && (
                    <MessageToUser
                      message={youngChildSurvey[0].options[1].messageIfSelected}
                      questionId={step.questionId}
                    />
                  )}
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
                          helperText={
                            errors[step.questionId] === "no-bodypart"
                              ? "Please provide body part input."
                              : ""
                          }
                          error={errors[step.questionId] === "no-bodypart"}
                          ref={bodyPartRef}
                        />

                        <MessageToUser
                          message={
                            youngChildSurvey[1].options[2]
                              .additionalResponseIfSelected.info
                          }
                          questionId={step.questionId}
                        />
                      </>
                    )}
                  {step.questionId === "how" &&
                    currentAnswer.how.value === 0 && (
                      <>
                        <StyledTextField
                          id="comment-notsure"
                          label={"Comment"}
                          variant="filled"
                          value={currentAnswer.how.commentForNotSure}
                          onChange={(event) => {
                            updateAnswer(
                              step.questionId,
                              event.target.value,
                              "commentForNotSure"
                            );
                          }}
                          helperText={
                            errors[step.questionId] === "no-commentForNotSure"
                              ? "Please provide comment."
                              : ""
                          }
                          error={
                            errors[step.questionId] === "no-commentForNotSure"
                          }
                          ref={notsureRef}
                        />

                        <MessageToUser
                          message={"Please provide comment."}
                          questionId={step.questionId}
                        />
                      </>
                    )}

                  {step.questionId !== "do" &&
                    step.questionId === "how" &&
                    currentAnswer.how.value !== 0 && (
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
                        <MessageToUser
                          message={youngChildSurvey[stepIndex]?.comment?.hint}
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
      <Popover
        id={"activity-guide"}
        open={Boolean(activityGuideAnchorEL)}
        anchorEl={activityGuideAnchorEL}
        onClose={handleOnActivityClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        {isActivityGuide ? (
          <div style={{ width: "750px", height: "550px" }}>Activity Guide</div>
        ) : (
          <div style={{ width: "750px", height: "550px" }}>
            Difficulty Scale
          </div>
        )}
      </Popover>
      <Popover
        id={"mini-guide"}
        open={Boolean(miniGuideAnchorEl)}
        anchorEl={miniGuideAnchorEl}
        onClose={handleOnMiniGuideClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {miniGuideInfo ? (
          <div
            style={{ width: "300px", height: "200px" }}
          >{`question:  ${miniGuideInfo.questionId}, response:  ${miniGuideInfo.label}`}</div>
        ) : (
          ""
        )}
      </Popover>
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
