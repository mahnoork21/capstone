import { ClientContext } from "@/context/ClientContext";
import { useContext, useEffect, useState } from "react";
import { youngChildActivity } from "../survey/helper/youngChildActivity";
import {
  questionIds,
  youngChildSurvey,
} from "../survey/helper/youngChildSurvey";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { isNullOrUndefined } from "@/utils/utils";
import MessageToUser from "../survey/components/info-component";
import PrimaryClientButton from "@/shared/client/buttons/primary";
import { updateCommentAndCompleteSurvey } from "@/firebase/surveyRepo";
import { useRouter } from "next/router";
import MainContainer from "@/shared/components/main-container";

import {
  SummaryContainer,
  ActivitySummaryWrapper,
  ActivitySummary,
  SummaryItemWrapper,
  AnswerWrapper,
  FinalCommentTextField,
  ButtonWrapper,
  StyledEditButton,
} from "./styled";

const SummaryContent = () => {
  const {
    activityResponses,
    setIsNavBarVisible,
    organizationId,
    clinicianId,
    surveyId,
    setCurrentActivityIndex,
    setIsEditMode,
    setSurvey,
  } = useContext(ClientContext);
  const [finalComment, setFinalComment] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setIsNavBarVisible(false);

    return () => {
      setIsNavBarVisible(true);
    };
  }, []);

  const handleSubmitClick = async () => {
    const submittedTimestamp = await updateCommentAndCompleteSurvey(
      finalComment
    );
    setSurvey((prevValue) => {
      return {
        ...prevValue,
        final_comment: finalComment,
        submitted: submittedTimestamp,
      };
    });
    router.push({
      pathname: "/client/survey-complete",
      query: {
        orgId: organizationId,
        clinicianId: clinicianId,
        surveyId: surveyId,
      },
    });
  };

  if (!activityResponses) {
    return;
  }

  const handleEditButtonClick = (index) => {
    setIsEditMode(true);

    setCurrentActivityIndex(index);
    router.push({
      pathname: "/client/survey",
      query: {
        orgId: organizationId,
        clinicianId: clinicianId,
        surveyId: surveyId,
      },
    });
  };

  return (
    <MainContainer>
      <SummaryContainer>
        <h1>Thank you for taking the time to complete the PUFI-2!</h1>
        <p>Please review your response before submitting. Click on the pencil icon below to adjust your answers for any of the activities. Once you are finished reviewing, click &quot;Submit&quot; at the bottom of the page</p>

        <ActivitySummaryWrapper>
          {youngChildActivity.map((activity, index) => {
            return (
              <ActivitySummary key={activity.id}>
                <div>
                  <span>{index + 1}.</span>
                  <h2>{activity.label}</h2>
                  <StyledEditButton
                    color="black"
                    onClick={() => handleEditButtonClick(index)}
                  >
                    <EditOutlinedIcon />
                  </StyledEditButton>
                </div>

                {questionIds.map((questionId, questionIndex) => {
                  const activityRespose = activityResponses[activity.id];
                  const questionRespose = activityRespose[questionId];

                  const option = youngChildSurvey[questionIndex].options.find(
                    (option) => {
                      return option.value === questionRespose.value;
                    }
                  );

                  return (
                    <div key={questionId}>
                      <SummaryItemWrapper>
                        <QuizOutlinedIcon />
                        <p>{youngChildSurvey[questionIndex].label}</p>
                      </SummaryItemWrapper>
                      <SummaryItemWrapper>
                        <KeyboardDoubleArrowRightOutlinedIcon />

                        <AnswerWrapper>
                          {!isNullOrUndefined(questionRespose.value) ? (
                            <>
                              <p>{option?.label}</p>
                              {questionId === "how" &&
                              questionRespose.value === 3 ? (
                                <p>{questionRespose.bodypart}</p>
                              ) : (
                                ""
                              )}
                              {questionId === "how" &&
                              questionRespose.value === 0 ? (
                                <p>{questionRespose.commentForNotSure}</p>
                              ) : (
                                ""
                              )}
                              {questionRespose.comment && (
                                <p>{questionRespose.comment}</p>
                              )}
                            </>
                          ) : (
                            "N/A"
                          )}
                        </AnswerWrapper>
                      </SummaryItemWrapper>
                    </div>
                  );
                })}
              </ActivitySummary>
            );
          })}
        </ActivitySummaryWrapper>
        <FinalCommentTextField
          variant="filled"
          multiline
          rows={3}
          onChange={(event) => {
            setFinalComment(event.target.value);
          }}
        />
        <MessageToUser message="Please write any comments about the skills your child does, how they use their prosthesis, and/or other activities they do two-handed." />
        <ButtonWrapper>
          <PrimaryClientButton variant="contained" onClick={handleSubmitClick}>
            Submit PUFI-2
          </PrimaryClientButton>
        </ButtonWrapper>
      </SummaryContainer>
    </MainContainer>
  );
};

export default SummaryContent;
