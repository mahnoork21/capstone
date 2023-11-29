import React, { useContext } from "react";
import {
  FilterListOutlined,
  KeyboardBackspaceOutlined,
} from "@mui/icons-material";

import { ClinicianContext } from "@/context/ClinicianContext";

import {
  SurveysBox,
  AddNewSurveyButton,
  BackButton,
  ButtonsBox,
  FilterSurveyButton,
} from "./styled";
import Pagination from "@/shared/clinician/pagination";
import SurveyCards from "@/shared/clinician/surveyCards";

export default function SurveysPerClient({
  surveysListData,
  totalSurveysCount,
  surveysPageNo,
  handleSurveysPageNoClick,
  toggleFilterPanelClick,
  addNewSurveyClick,
  handleBackButtonClick,
  handleArchiveOfId,
}) {
  const { breakpoint } = useContext(ClinicianContext);

  return (
    <SurveysBox>
      <ButtonsBox>
        <div>
          {breakpoint === "mobile" && (
            <BackButton
              onClick={() => {
                handleBackButtonClick();
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

      <SurveyCards
        surveysListData={surveysListData}
        surveysPageNo={surveysPageNo}
        handleArchiveRestoreOfId={handleArchiveOfId}
      />

      <Pagination
        totalSurveysCount={totalSurveysCount}
        surveysPageNo={surveysPageNo}
        handleSurveysPageNoClick={handleSurveysPageNoClick}
      />
    </SurveysBox>
  );
}
