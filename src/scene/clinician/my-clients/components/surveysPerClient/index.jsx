import React, { useContext, useEffect } from "react";
import { IconButton } from "@mui/material";
import {
  FilterListOutlined,
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  KeyboardBackspaceOutlined,
} from "@mui/icons-material";

import { ClinicianContext } from "@/context/ClinicianContext";
import ClientSurveyCard from "@/shared/clinician/clientSurveyCard";
import {
  AddNewSurveyButton,
  BackButton,
  ButtonsBox,
  FilterSurveyButton,
  NumberOfSurveysTypography,
  StyledBox2,
  StyledBox3,
  StyledButtonsBox2,
  SurveysBox,
} from "./styled";

const noOfItemsOnOnePage = 6;

export default function SurveysPerClient({
  surveysListData,
  surveysPageNo,
  handleSurveysPageNoClick,
  toggleFilterPanelClick,
  addNewSurveyClick,
}) {
  const { breakpoint } = useContext(ClinicianContext);

  useEffect(() => {
    if (surveysListData.length === 0) {
      handleSurveysPageNoClick(0);
    } else {
      handleSurveysPageNoClick(1);
    }
  }, [surveysListData]);

  return (
    <SurveysBox>
      <ButtonsBox>
        <div>
          {breakpoint === "mobile" && (
            <BackButton
              onClick={() => {
                handleListItemClick();
                handleSurveysPageNoClick(1);
              }}
            >
              <KeyboardBackspaceOutlined />
            </BackButton>
          )}
        </div>
        <div>
          <AddNewSurveyButton onClick={addNewSurveyClick}>
            Add New Survey
          </AddNewSurveyButton>
          <FilterSurveyButton onClick={toggleFilterPanelClick}>
            <FilterListOutlined />
            {breakpoint === "desktop" && "Filter"}
          </FilterSurveyButton>
        </div>
      </ButtonsBox>

      <StyledBox2>
        {surveysListData
          .slice(
            noOfItemsOnOnePage * (surveysPageNo - 1),
            noOfItemsOnOnePage * surveysPageNo
          )
          .map(
            ({
              clientId,
              surveyId,
              type,
              creationDate,
              completionDate,
              percentageComplete,
            }) => (
              <ClientSurveyCard
                key={surveyId}
                clientId={clientId}
                surveyId={surveyId}
                type={type}
                creationDate={creationDate}
                completionDate={completionDate}
                percentageComplete={percentageComplete}
              />
            )
          )}
      </StyledBox2>

      <StyledBox3>
        <NumberOfSurveysTypography>
          {Math.max(noOfItemsOnOnePage * (surveysPageNo - 1) + 1, 0)}
          {" - " +
            Math.min(
              noOfItemsOnOnePage * surveysPageNo,
              surveysListData.length
            ) || 0}
          {" of " + surveysListData.length || 0} Surveys
        </NumberOfSurveysTypography>
        <StyledButtonsBox2>
          <IconButton
            aria-label="keyboardArrowLeft"
            disabled={surveysPageNo === 0 || surveysPageNo === 1}
            onClick={() =>
              handleSurveysPageNoClick((n) => (n === 1 ? n : n - 1))
            }
          >
            <KeyboardArrowLeftSharp />
          </IconButton>
          <IconButton
            aria-label="keyboardArrowRight"
            disabled={
              surveysPageNo ===
                Math.ceil(surveysListData.length / noOfItemsOnOnePage) ||
              surveysPageNo === 0
            }
            onClick={() =>
              handleSurveysPageNoClick((n) =>
                n === Math.ceil(surveysListData.length / noOfItemsOnOnePage)
                  ? n
                  : n + 1
              )
            }
          >
            <KeyboardArrowRightSharp />
          </IconButton>
        </StyledButtonsBox2>
      </StyledBox3>
    </SurveysBox>
  );
}