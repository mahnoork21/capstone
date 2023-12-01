import React, { useContext } from "react";
import {
  FilterListOutlined,
  KeyboardBackspaceOutlined,
  FilterListOffOutlined,
} from "@mui/icons-material";

import { ClinicianContext } from "@/context/ClinicianContext";

import {
  SurveysBox,
  AddNewSurveyButton,
  BackButton,
  ButtonsBox,
  FilterSurveyButton,
  FilterSurveyResetButton,
} from "./styled";
import Pagination from "@/shared/clinician/pagination";
import SurveyCards from "@/shared/clinician/surveyCards";
import FilterInfo from "@/shared/clinician/filterInfo";
import { Button } from "@mui/material";

export default function SurveysPerClient({
  surveysListData,
  totalSurveysCount,
  surveysPageNo,
  handleSurveysPageNoClick,
  toggleFilterPanelClick,
  addNewSurveyClick,
  handleBackButtonClick,
  reloadPageData,
  noOfItemsOnOnePage,
  filterFormData,
  handleResetFilter,
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
          <div className="filterInfo">
            {Object.values(filterFormData).some((value) => value !== "") && (
              <FilterInfo formData={filterFormData} />
            )}
          </div>
          <AddNewSurveyButton onClick={addNewSurveyClick}>
            Add New Survey
          </AddNewSurveyButton>

          <FilterSurveyButton onClick={toggleFilterPanelClick}>
            <FilterListOutlined />
            {breakpoint === "desktop" && "Filter"}
          </FilterSurveyButton>
          <FilterSurveyResetButton onClick={handleResetFilter}>
            <FilterListOffOutlined />
            {breakpoint === "desktop" && "Reset"}
          </FilterSurveyResetButton>
        </div>
      </ButtonsBox>

      <SurveyCards
        surveysListData={surveysListData}
        surveysPageNo={surveysPageNo}
        reloadPageData={reloadPageData}
        noOfItemsOnOnePage={noOfItemsOnOnePage}
      />

      <Pagination
        totalSurveysCount={totalSurveysCount}
        surveysPageNo={surveysPageNo}
        handleSurveysPageNoClick={handleSurveysPageNoClick}
        noOfItemsOnOnePage={noOfItemsOnOnePage}
      />
    </SurveysBox>
  );
}
