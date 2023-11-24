import React, { useEffect, useState } from "react";
import { Container, InnerContainer, SearchButton, StyledBox } from "./styled";
import SearchIcon from "@mui/icons-material/Search";
import { Tab, Tabs } from "@mui/material";
import {
  fetchAllClinicianSurveys,
  fetchClinicianSurveyById,
  fetchFilteredClinicianSurveys,
} from "@/firebase/clinicianRepo";
import { MainContainerBox } from "../my-clients/styled";
import FilterPanel from "@/shared/clinician/filterPanel";
import Pagination from "@/shared/clinician/pagination";
import SurveyCards from "@/shared/clinician/surveyCards";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const AllSurveys = () => {
  //Surveys List Data for Active and Archived Surveys
  const [surveysListDataActive, setSurveysListDataActive] = useState([]);
  const [surveysListDataArchived, setSurveysListDataArchived] = useState([]);

  useEffect(() => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    const surveysRef = collection(
      db,
      "Organization",
      orgId,
      "Clinician",
      clinicianId,
      "Survey"
    );
    const q = query(surveysRef);

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const active = await fetchAllClinicianSurveys(orgId, clinicianId, false);
      setSurveysListDataActive(active);

      const archived = await fetchAllClinicianSurveys(orgId, clinicianId, true);
      setSurveysListDataArchived(archived);
    });

    return () => unsubscribe();
  }, []);

  //Surveys Page Number
  const [surveysPageNo, setSurveysPageNo] = useState(1);
  const handleSurveysPageNoClick = (p) => {
    setSurveysPageNo(p);
  };

  //Tabs
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSurveysPageNo(1);
  };

  //Surveys Filter
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanelClick = (event) => {
    if (event) {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
    }

    setIsFilterPanelOpen((s) => !s);
  };

  //Filtered Surveys
  const updateFilteredSurveys = async (formData, searchBy) => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    if (searchBy === "surveyId") {
      const resultSurvey = await fetchClinicianSurveyById(
        orgId,
        clinicianId,
        formData.clientId,
        formData.surveyId
      );
      if (resultSurvey) {
        if (resultSurvey["is_archived"]) {
          setSurveysListDataArchived([resultSurvey]);
          setSurveysListDataActive([]);
        } else {
          setSurveysListDataActive([resultSurvey]);
          setSurveysListDataArchived([]);
        }
      } else {
        setSurveysListDataArchived([]);
        setSurveysListDataActive([]);
      }
    } else {
      const resultSurveysActive = await fetchFilteredClinicianSurveys(
        orgId,
        clinicianId,
        formData,
        false
      );

      const resultSurveysArchived = await fetchFilteredClinicianSurveys(
        orgId,
        clinicianId,
        formData,
        true
      );

      if (resultSurveysActive.length > 0) {
        setSurveysListDataActive(resultSurveysActive);
      } else {
        setSurveysListDataActive([]);
      }

      if (resultSurveysArchived.length > 0) {
        setSurveysListDataArchived(resultSurveysArchived);
      } else {
        setSurveysListDataArchived([]);
      }
    }

    setSurveysPageNo(1);
  };

  return (
    <MainContainerBox>
      <Container>
        <div className="header">
          <h1>ALL SURVEYS</h1>
          <SearchButton
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={toggleFilterPanelClick}
          >
            SEARCH SURVEY
          </SearchButton>
        </div>

        <StyledBox>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Active" />
            <Tab label="Archived" />
          </Tabs>
        </StyledBox>

        <InnerContainer>
          <SurveyCards
            surveysListData={
              selectedTab === 0
                ? surveysListDataActive
                : surveysListDataArchived
            }
            surveysPageNo={surveysPageNo}
          />

          <Pagination
            surveysListData={
              selectedTab === 0
                ? surveysListDataActive
                : surveysListDataArchived
            }
            surveysPageNo={surveysPageNo}
            handleSurveysPageNoClick={handleSurveysPageNoClick}
          />
        </InnerContainer>
      </Container>

      <FilterPanel
        isFilterPanelOpen={isFilterPanelOpen}
        toggleFilterPanelClick={toggleFilterPanelClick}
        updateFilteredSurveys={updateFilteredSurveys}
      />
    </MainContainerBox>
  );
};

export default AllSurveys;
