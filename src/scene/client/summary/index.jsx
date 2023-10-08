import { ClientContext } from "@/context/ClientContext";
import { useContext } from "react";
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
import { Button } from "@mui/material";
import PrimaryClientButton from "@/shared/client/buttons/primary";

const {
  default: MainContainer,
} = require("@/shared/components/main-container");
const {
  SummaryContainer,
  ActivitySummaryWrapper,
  ActivitySummary,
  SummaryItemWrapper,
  AnswerWrapper,
  FinalCommentTextField,
  ButtonWrapper,
} = require("./styled");

const SummaryContent = () => {
  const { activityResponses } = useContext(ClientContext);

  return (
    <MainContainer>
      <SummaryContainer>
        <h1>Thank you for taking the time to complete the PUFI-2!</h1>
        <p>Please review your response before submitting.</p>

        <ActivitySummaryWrapper>
          {youngChildActivity.map((activity, index) => {
            return (
              <ActivitySummary>
                <div>
                  <span>{index + 1}.</span>
                  <h2>{activity.label}</h2>
                  <EditOutlinedIcon />
                </div>

                {questionIds.map((questionId, questionIndex) => {
                  const activityRespose = activityResponses[activity.id];
                  const questionRespose = activityRespose[questionId];

                  console.log("### ", youngChildSurvey[questionIndex].options);
                  const option = youngChildSurvey[questionIndex].options.find(
                    (option) => {
                      return option.value === questionRespose.value;
                    }
                  );

                  return (
                    <div>
                      <SummaryItemWrapper>
                        <QuizOutlinedIcon />
                        <p>{youngChildSurvey[questionIndex].label}</p>
                      </SummaryItemWrapper>
                      <SummaryItemWrapper>
                        <KeyboardDoubleArrowRightOutlinedIcon />
                        {}

                        <AnswerWrapper>
                          {!isNullOrUndefined(questionRespose.value) ? (
                            <>
                              <p>{option?.label}</p>
                              <p>
                                {questionId === "how" &&
                                questionRespose.value === 3
                                  ? questionRespose.bodypart
                                  : ""}
                              </p>
                              <p>
                                {questionId === "how" &&
                                questionRespose.value === 0
                                  ? questionRespose.commentForNotSure
                                  : ""}
                              </p>
                              <p>{questionRespose.comment}</p>
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
        <FinalCommentTextField variant="filled" multiline rows={4} />
        <MessageToUser message="Please write any comments about the skills your child does, how they use their prosthesis, and/or other activities they do two-handed." />
        <ButtonWrapper>
          <PrimaryClientButton variant="contained">
            Submit Survey
          </PrimaryClientButton>
        </ButtonWrapper>
      </SummaryContainer>
    </MainContainer>
  );
};

export default SummaryContent;
