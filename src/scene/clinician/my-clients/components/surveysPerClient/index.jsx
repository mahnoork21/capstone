import React, { useContext, useEffect } from "react";
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
  surveysPageNo,
  handleSurveysPageNoClick,
  toggleFilterPanelClick,
  addNewSurveyClick,
  handleListItemClick,
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

      <SurveyCards
        surveysListData={surveysListData}
        surveysPageNo={surveysPageNo}
      />

      <Pagination
        surveysListData={surveysListData}
        surveysPageNo={surveysPageNo}
        handleSurveysPageNoClick={handleSurveysPageNoClick}
      />
    </SurveysBox>
  );
}
