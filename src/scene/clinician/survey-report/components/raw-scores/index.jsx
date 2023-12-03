import {
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BoldTableCell,
  StyledTableRow,
  StyledTableContainer,
  StyledCommentIcon,
  AnswerWrapper,
  PopoverWrapper,
  PopoverContentItem,
  FinalCommentWrapper,
} from "./styled";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";
import { useState } from "react";

const RawScores = ({ surveyData }) => {
  const [commentAnchorEl, setcommentAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState();

  const handleClose = () => {
    setcommentAnchorEl(null);
  };

  return (
    <>
      {Object.keys(surveyData).length && (
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "",
                  "Activity",
                  "Is the activity done?",
                  "Usage",
                  "Ease of Use",
                  "Usefulness",
                  "Without Prosthesis",
                ].map((headerItem) => (
                  <BoldTableCell key={headerItem} align="center">
                    {headerItem}
                  </BoldTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {youngChildActivity.map((activity, index) => {
                const currentActivityResponse =
                  surveyData.activity_response[activity.id];
                return (
                  <StyledTableRow key={activity.id}>
                    <BoldTableCell align="center">{index + 1}</BoldTableCell>
                    <BoldTableCell component="th" scope="row" align="center">
                      {activity.id}
                    </BoldTableCell>
                    {youngChildSurvey.map((question, index) => {
                      if (!currentActivityResponse) {
                        return (
                          <TableCell key={question.id} align="center">
                            N/A
                          </TableCell>
                        );
                      }
                      const surveyValue =
                        currentActivityResponse[question.questionId].value ?? 0;

                      const option = question.options.find(
                        (option) => option.value === surveyValue
                      );

                      return (
                        <TableCell key={question.id} align="center">
                          <AnswerWrapper>
                            {option.rawScoreLabel ??
                              option.labelShort ??
                              option.label}
                            {index === 1 && surveyValue === 3 && (
                              <StyledCommentIcon
                                width={24}
                                height={24}
                                src="/icons/notes.svg"
                                onClick={(event) => {
                                  const popoverContentData = [];
                                  popoverContentData.push({
                                    title: "Body part",
                                    data: currentActivityResponse[
                                      question.questionId
                                    ].bodypart,
                                  });
                                  {
                                    currentActivityResponse[question.questionId]
                                      .comment
                                      ? popoverContentData.push({
                                          title: "Comment",
                                          data: currentActivityResponse[
                                            question.questionId
                                          ].comment,
                                        })
                                      : ``;
                                  }
                                  setPopoverContent(popoverContentData);
                                  setcommentAnchorEl(event.currentTarget);
                                }}
                              />
                            )}
                            {index === 1 &&
                              surveyValue === 0 &&
                              currentActivityResponse[question.questionId]
                                ?.commentForNotSure && (
                                <StyledCommentIcon
                                  width={24}
                                  height={24}
                                  src="/icons/notes.svg"
                                  onClick={(event) => {
                                    const popoverContentData = [];
                                    popoverContentData.push({
                                      title: "Comment",
                                      data: currentActivityResponse[
                                        question.questionId
                                      ].commentForNotSure,
                                    });
                                    setPopoverContent(popoverContentData);
                                    setcommentAnchorEl(event.currentTarget);
                                  }}
                                />
                              )}
                            {index !== 1 &&
                              currentActivityResponse[question.questionId]
                                ?.comment && (
                                <StyledCommentIcon
                                  width={24}
                                  height={24}
                                  src="/icons/notes.svg"
                                  onClick={(event) => {
                                    const popoverContentData = [];
                                    popoverContentData.push({
                                      title: "Comment",
                                      data: currentActivityResponse[
                                        question.questionId
                                      ].comment,
                                    });
                                    setPopoverContent(popoverContentData);
                                    setcommentAnchorEl(event.currentTarget);
                                  }}
                                />
                              )}
                          </AnswerWrapper>
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
      {surveyData.final_comment && (
        <FinalCommentWrapper>
          <p>Final Comment:</p>
          <p>{surveyData.final_comment}</p>
        </FinalCommentWrapper>
      )}
      <Popover
        open={Boolean(commentAnchorEl)}
        anchorEl={commentAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <PopoverWrapper>
          {popoverContent?.map(({ title, data }) => {
            return (
              <PopoverContentItem key={title}>
                <span>{title}: </span>
                <span>{data}</span>
              </PopoverContentItem>
            );
          })}
        </PopoverWrapper>
      </Popover>
    </>
  );
};

export default RawScores;
