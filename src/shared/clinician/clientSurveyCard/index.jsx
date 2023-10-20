import React from "react";
import {
  StyledCard,
  StyledCardActions,
  StyledCardContent,
  StyledIconButton,
  StyledLink,
  StyledTypography1,
  StyledTypography2,
} from "./styled";
import { MoreHorizRounded } from "@mui/icons-material";

const ClientSurveyCard = ({
  clientId,
  surveyId,
  type,
  creationDate,
  completionDate,
  percentageComplete,
}) => {
  //   var today = new Date();
  //   console.log(today);
  //   var dd = String(today.getDate()).padStart(2, "0");
  //   var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  //   var yyyy = today.getFullYear();

  //   today = mm + "/" + dd + "/" + yyyy;
  //   console.log(today);

  //   var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  //   console.log(utc);

  return (
    <>
      <StyledCard>
        <StyledCardContent>
          <StyledTypography1>Client Id:</StyledTypography1>
          <StyledTypography2>{clientId}</StyledTypography2>
          <StyledTypography1>Survey Id:</StyledTypography1>
          <StyledTypography2>{surveyId}</StyledTypography2>
          <StyledTypography1>Type:</StyledTypography1>
          <StyledTypography2>{type}</StyledTypography2>
          <StyledTypography1>Last Updated:</StyledTypography1>
          <StyledTypography2>12 days ago (40% complete)</StyledTypography2>
        </StyledCardContent>
        <StyledCardActions>
          <StyledLink href="#" underline="hover">
            SEND REMINDER
          </StyledLink>
          <StyledIconButton>
            <MoreHorizRounded />
          </StyledIconButton>
        </StyledCardActions>
      </StyledCard>
    </>
  );
};

export default ClientSurveyCard;
