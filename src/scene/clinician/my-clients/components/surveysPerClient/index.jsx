import React, { useState, useContext, useEffect } from "react";
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
  fetchClientSurveys,
  getTotalSurveysForClient,
} from "@/firebase/clinicianRepo";
import {
  SurveysBox,
  AddNewSurveyButton,
  BackButton,
  ButtonsBox,
  FilterSurveyButton,
  NumberOfSurveysTypography,
  SurveyCardsBox,
  PaginationBox,
  StyledForwardAndBackwardButtonsBox,
} from "./styled";

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

      <SurveyCardsBox>
        {surveysListData
          .slice(
            noOfItemsOnOnePage * (surveysPageNo - 1),
            noOfItemsOnOnePage * surveysPageNo
          )
          .map(
            ({
              survey_id,
              survey_type,
              client_id,
              clinician_id,
              org_id,
              created,
              updated,
              submitted,
              is_submitted,
              activity_response,
            }) => (
              <ClientSurveyCard
                key={survey_id}
                surveyId={survey_id}
                surveyType={survey_type}
                clientId={client_id}
                clinicianId={clinician_id}
                orgId={org_id}
                createdDate={created}
                updatedDate={updated}
                submittedDate={submitted}
                isSubmitted={is_submitted}
                activityResponse={activity_response}
              />
            )
          )}
      </SurveyCardsBox>

      <PaginationBox>
        <NumberOfSurveysTypography>
          {Math.max(noOfItemsOnOnePage * (surveysPageNo - 1) + 1, 0)}
          {" - " +
            Math.min(noOfItemsOnOnePage * surveysPageNo, totalSurveysCount) ||
            0}
          {" of " + totalSurveysCount || 0} Surveys
        </NumberOfSurveysTypography>
        <StyledForwardAndBackwardButtonsBox>
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
                Math.ceil(totalSurveysCount / noOfItemsOnOnePage) ||
              surveysPageNo === 0
            }
            onClick={() =>
              handleSurveysPageNoClick((n) =>
                n === Math.ceil(totalSurveysCount / noOfItemsOnOnePage)
                  ? n
                  : n + 1
              )
            }
          >
            <KeyboardArrowRightSharp />
          </IconButton>
        </StyledForwardAndBackwardButtonsBox>
      </PaginationBox>
    </SurveysBox>
  );
}
