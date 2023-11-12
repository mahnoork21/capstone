import React, { useEffect } from "react";
import differenceInDays from "date-fns/differenceInDays";
import { MoreHorizRounded } from "@mui/icons-material";
import {
  StyledCard,
  StyledCardActions,
  StyledCardContent,
  StyledIconButton,
  StyledLink,
  StyledTypography1,
  StyledTypography2,
} from "./styled";

const ClientSurveyCard = ({
  surveyId,
  surveyType,
  clientId,
  clinicianId,
  orgId,
  createdDate,
  updatedDate,
  submittedDate,
  isSubmitted,
  activityResponse,
}) => {
  useEffect(() => {
    const url = `${window.location.host}/client?orgId=${orgId}&clinicianId=${clinicianId}&surveyId=${surveyId}`;
    console.log(url);
  }, []);

  // TODO: Handle Dropdown buttons

  //TODO: Implement URL for email
  // http://localhost:3005/client?orgId=oZqnljuEU4b3jZtfHM9v&clinicianId=3vAa4UkWlrT4bdS1L5BfKszHqkl1&surveyId=30niDrNz2WnfgDBQlivC

  const inProgressText = () => {
    const daysDiff = differenceInDays(new Date(), updatedDate.toDate());
    const questionsCount = surveyType.startsWith("Young") ? 23 : 27;
    const percentComplete = Math.ceil(
      (Object.keys(activityResponse).length * 100) / questionsCount
    );

    return (
      (daysDiff > 1
        ? daysDiff + " days ago "
        : daysDiff == 1
        ? "Yesterday"
        : "Today ") +
      " (" +
      percentComplete +
      "% complete)"
    );
  };

  return (
    <>
      <StyledCard
        topColor={
          isSubmitted
            ? "var(--pufi-primary-light, #53BB50)"
            : updatedDate
            ? "#FCAF17"
            : "#E9501E"
        }
      >
        <StyledCardContent>
          <StyledTypography1>Client ID:</StyledTypography1>
          <StyledTypography2>{clientId}</StyledTypography2>
          <StyledTypography1>Survey ID:</StyledTypography1>
          <StyledTypography2>{surveyId}</StyledTypography2>
          <StyledTypography1>Type:</StyledTypography1>
          <StyledTypography2>{surveyType}</StyledTypography2>
          <StyledTypography1>
            {isSubmitted
              ? "Completed"
              : updatedDate
              ? "Last Updated:"
              : "Created"}
          </StyledTypography1>
          <StyledTypography2>
            {isSubmitted
              ? submittedDate.toDate().toDateString()
              : updatedDate
              ? inProgressText()
              : createdDate.toDate().toDateString()}
          </StyledTypography2>
        </StyledCardContent>
        <StyledCardActions>
          {isSubmitted ? (
            <StyledLink href="#" underline="hover">
              VIEW SCORES
            </StyledLink>
          ) : updatedDate ? (
            <StyledLink href="#" underline="hover">
              SEND REMINDER
            </StyledLink>
          ) : (
            <StyledLink href="#" underline="hover">
              EMAIL CLIENT
            </StyledLink>
          )}

          <StyledIconButton>
            <MoreHorizRounded />
          </StyledIconButton>
        </StyledCardActions>
      </StyledCard>
    </>
  );
};

export default ClientSurveyCard;
