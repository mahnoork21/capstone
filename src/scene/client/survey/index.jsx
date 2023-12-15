import MainContainer from "@/shared/components/main-container";
import {
  EditModeButtons,
  MiniGuidePopover,
  MiniGuidePopoverWrapper,
  StyledPopover,
  StyledStepper,
  StyledTextField,
  SurveyContainer,
  SurveyNavigationWrapper,
} from "./styled";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Drawer,
  Radio,
  RadioGroup,
  Step,
  StepContent,
  StepLabel,
} from "@mui/material";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import {
  checkIfALLResponsesAreValid,
  checkIfResponseIsValid,
} from "./helper/surveyHelper";
import { youngChildSurvey } from "./helper/youngChildSurvey";
import { getSurveyById, updateAnswerInSurvey } from "@/firebase/surveyRepo";
import ActivityInfoHeading from "./components/activity-info-heading";
import MessageToUser from "./components/info-component";
import ActivityQuestion from "./components/activity-question";
import Option from "./components/option";
import { useRouter } from "next/router";
import { ClientContext } from "@/context/ClientContext";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import SurveyNavButton from "@/shared/client/buttons/survey-nav-buttons";
import { ProgressLabel } from "./components/activity-info-heading/styled";
import ActivityGuideInstructionArea from "@/shared/client/section/activity-guide-instruction-area";
import DifficultyScaleInstructionArea from "@/shared/client/section/difficulty-scale-instruction-area";
import MiniGuide from "./components/mini-guide";
import PrimaryClientButton from "@/shared/client/buttons/primary";
import SecondaryClientButton from "@/shared/client/buttons/secondary";

const SurveyContent = () => {
  const {
    isEditMode,
    setIsEditMode,
    currentActivityIndex,
    currentAnswer,
    setCurrentActivityIndex,
    updateAnswer,
    errors,
    setErrors,
    setSurvey,
    organizationId,
    clinicianId,
    surveyId,
    setHeaderButtonType,
    activityResponses,
    breakpoint,
  } = useContext(ClientContext);
  const currentActivity = youngChildActivity[currentActivityIndex];
  const [steps, setSteps] = useState();

  const noResponseRef = useRef();
  const bodyPartRef = useRef();
  const notsureRef = useRef();

  const router = useRouter();

  const [activityGuideAnchorEL, setActivityGuideAnchorEL] = useState(null);
  const [isActivityGuide, setIsActivityGuide] = useState(true);

  const [miniGuideAnchorEl, setMiniGuideAnchorEL] = useState(null);
  const [miniGuideInfo, setMiniGuideInfo] = useState(null);
  const [isUpdatingdb, setIsUpdatingdb] = useState(false);

  const isDoMessageVisible = currentAnswer
    ? currentAnswer.do.value === 1
    : false;

  useEffect(() => {
    isEditMode
      ? setHeaderButtonType(HeaderButtonType.SAVE_CHANGES)
      : setHeaderButtonType(HeaderButtonType.SAVE_AND_EXIT);
  }, []);

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

  useEffect(() => {
    //assumes that there can be only one error at a time
    const error = Object.values(errors)[0];
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
    const error = checkIfALLResponsesAreValid(currentAnswer);

    if (!error) {
      try {
        setIsUpdatingdb(true);
        await updateAnswerInSurvey(
          youngChildActivity[currentActivityIndex].id,
          currentAnswer
        );
        //update the local copy
        const survey = await getSurveyById(
          organizationId,
          clinicianId,
          surveyId
        );
        setSurvey(survey);

        setIsUpdatingdb(false);

        //end of survey
        if (currentActivityIndex + 1 === youngChildActivity.length) {
          router.push({
            pathname: "/client/summary",
            query: {
              orgId: organizationId,
              clinicianId: clinicianId,
              surveyId: surveyId,
            },
          });
          return;
        }

        setIsEditMode(false);
        isEditMode
          ? router.push({
              pathname: "/client/summary",
              query: {
                orgId: organizationId,
                clinicianId: clinicianId,
                surveyId: surveyId,
              },
            })
          : setCurrentActivityIndex(currentActivityIndex + 1);
      } catch (error) {
        console.log(`Error when updating or getting`, error);
        return;
      }
    } else {
      setErrors(error);
    }
  };

  const handleOnBackButtonClicked = async () => {
    const error = checkIfALLResponsesAreValid(currentAnswer);

    const isInProgressQuestion =
      currentActivityIndex + 1 >= Object.keys(activityResponses).length;

    if (!error || isInProgressQuestion) {
      try {
        setIsUpdatingdb(true);
        await updateAnswerInSurvey(
          youngChildActivity[currentActivityIndex].id,
          currentAnswer
        );
        //update the local copy
        const survey = await getSurveyById(
          organizationId,
          clinicianId,
          surveyId
        );
        setSurvey(survey);
        setIsUpdatingdb(false);

        setCurrentActivityIndex(currentActivityIndex - 1);
      } catch (error) {
        console.log(`Error when updating or getting`, error);
        return;
      }
    } else {
      setErrors(error);
    }
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

  const handleDiscardButtonClick = () => {
    setIsEditMode(false);
    router.push({
      pathname: "/client/summary",
      query: {
        orgId: organizationId,
        clinicianId: clinicianId,
        surveyId: surveyId,
      },
    });
  };

  if (process.env.NEXT_PUBLIC_NAME === "development") {
    console.log("[Debug] Activity == ", currentActivity);
    console.log("[Debug] Answer == ", currentAnswer);
    console.log("[Debug] Steps == ", steps);
    console.log("[Debug] Errors == ", errors);
  }

  return (
    <MainContainer>
      <SurveyContainer isDoMessageVisible={Boolean(isDoMessageVisible)}>
        <ActivityInfoHeading
          currentActivityIndex={currentActivityIndex}
          activityLabel={currentActivity?.label}
        />
        <StyledStepper key={currentActivity?.id} orientation="vertical">
          {steps?.map((step, stepIndex) => {
            return step.questionId === "do" || currentAnswer.do.value ? (
              <Step
                className={step.questionId}
                active={isStepVisible(stepIndex)}
                key={step.questionId}
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
                      ({ questionId, value, label, miniGuideType }) => {
                        return (
                          <Option
                            key={label}
                            checked={getSavedAnswer(step.questionId) == value}
                            value={value}
                            control={<Radio />}
                            name={`radio-buttons-${questionId}`}
                            label={label}
                            updateAnswer={updateAnswer}
                            questionId={step.questionId}
                            miniGuideType={miniGuideType}
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

                  {(step.questionId === "how" &&
                    currentAnswer.how.value !== 0) ||
                  ["well", "useful", "without"].includes(step.questionId) ? (
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
                  ) : (
                    ""
                  )}
                </StepContent>
              </Step>
            ) : null;
          })}
        </StyledStepper>

        {isEditMode ? (
          <EditModeButtons>
            <PrimaryClientButton onClick={handleOnNextButtonClicked}>
              Save Changes
            </PrimaryClientButton>
            <SecondaryClientButton onClick={handleDiscardButtonClick}>
              Discard Changes
            </SecondaryClientButton>
          </EditModeButtons>
        ) : (
          <SurveyNavigationWrapper>
            {currentActivityIndex !== 0 && (
              <SurveyNavButton
                variant="outlined"
                onClick={handleOnBackButtonClicked}
                isBack={true}
                isLoading={isUpdatingdb}
              >
                Back
              </SurveyNavButton>
            )}
            <ProgressLabel>
              {currentActivityIndex + 1} of {youngChildActivity.length}{" "}
              Activities
            </ProgressLabel>
            <SurveyNavButton
              variant="outlined"
              onClick={handleOnNextButtonClicked}
              isLoading={isUpdatingdb}
            >
              Next
            </SurveyNavButton>
          </SurveyNavigationWrapper>
        )}
      </SurveyContainer>
      <MiniGuidePopover
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
        {miniGuideInfo && (
          <MiniGuidePopoverWrapper>
            <MiniGuide
              questionId={miniGuideInfo.questionId}
              miniGuideType={miniGuideInfo.miniGuideType}
            />
          </MiniGuidePopoverWrapper>
        )}
      </MiniGuidePopover>
      {breakpoint === "desktop" ? (
        <StyledPopover
          id={"survey-activity-guide"}
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
            <ActivityGuideInstructionArea
              isInSurvey={true}
              handleOnActivityClose={handleOnActivityClose}
            />
          ) : (
            <DifficultyScaleInstructionArea
              isInSurvey={true}
              handleOnActivityClose={handleOnActivityClose}
            />
          )}
        </StyledPopover>
      ) : (
        <Drawer
          anchor={"right"}
          open={Boolean(activityGuideAnchorEL)}
          onClose={handleOnActivityClose}
          variant="temporary"
        >
          {isActivityGuide ? (
            <ActivityGuideInstructionArea isInSurvey={true} />
          ) : (
            <DifficultyScaleInstructionArea isInSurvey={true} />
          )}
        </Drawer>
      )}
    </MainContainer>
  );
};

const Survey = () => {
  return <SurveyContent />;
};

export default Survey;
