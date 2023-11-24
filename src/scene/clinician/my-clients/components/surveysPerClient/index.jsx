import React, { useState, useContext, useEffect } from "react";
import { IconButton } from "@mui/material";
import {
  FilterListOutlined,
  KeyboardBackspaceOutlined,
} from "@mui/icons-material";

import { ClinicianContext } from "@/context/ClinicianContext";
import ClientSurveyCard from "@/shared/clinician/clientSurveyCard";
import {
  fetchClientSurveys,
  getTotalSurveysForClient,
} from "@/firebase/clinicianRepo";
import {
  SurveysBox,
  AddNewSurveyButton,
  BackButton,
  ButtonsBox,
  FilterSurveyButton,
} from "./styled";
import Pagination from "@/shared/clinician/pagination";
import SurveyCards from "@/shared/clinician/surveyCards";

const noOfItemsOnOnePage = 6;

export default function SurveysPerClient({
  toggleFilterPanelClick,
  addNewSurveyClick,
  handleBackButtonClick,
  clientId,
}) {
  const { breakpoint } = useContext(ClinicianContext);

  const [totalSurveysCount, setTotalSurveysCount] = useState(0);
  const [surveysPageNo, setSurveysPageNo] = useState(1);
  const handleSurveysPageNoClick = (p) => {
    setSurveysPageNo(p);
  };

  const [surveysListData, setSurveysListData] = useState([]);

  // First render: Get total surveys count and first surveys page
  useEffect(() => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      try {
        const count = await getTotalSurveysForClient(
          orgId,
          clinicianId,
          clientId
        );
        setTotalSurveysCount(count);

        // If there are no surveys, set page no. as 0
        if (count == 0) {
          setSurveysPageNo(0);
          return;
        }

        const surveys = await fetchClientSurveys(
          orgId,
          clinicianId,
          clientId,
          1
        );
        setSurveysListData(surveys);
      } catch (err) {
        console.error("An error occurred: " + err);
      }
    })();

    return () => {
      setSurveysListData([]);
      setSurveysPageNo(1);
    };
  }, [clientId]);

  // Data fetch on page increment
  useEffect(() => {
    if (surveysPageNo == 0 || surveysPageNo == 1) return;

    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    //Don't load data if page is decremented (data already loaded)
    const dataLoadedTillPageNo = Math.ceil(
      surveysListData.length / noOfItemsOnOnePage
    );

    if (dataLoadedTillPageNo < surveysPageNo) {
      (async () => {
        try {
          const surveys = await fetchClientSurveys(
            orgId,
            clinicianId,
            clientId,
            surveysPageNo
          );
          setSurveysListData((s) => s.concat(surveys));
          // setSurveysListData(surveys);
        } catch (err) {
          console.error("An error occurred: " + err);
        }
      })();
    }
  }, [surveysPageNo]);

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
      />

      <Pagination
        totalSurveysCount={totalSurveysCount}
        surveysPageNo={surveysPageNo}
        handleSurveysPageNoClick={handleSurveysPageNoClick}
      />
    </SurveysBox>
  );
}
