import React, { useEffect, useState } from "react";
import { Container, SearchButton, StyledBox } from "./styled";
import SearchIcon from "@mui/icons-material/Search";
import { Tab, Tabs } from "@mui/material";
import { fetchAllClinicianSurveys } from "@/firebase/clinicianRepo";
import SurveyCards from "./components/survey-cards";
import Pagination from "./components/pagination";

const AllSurveys = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [surveysListDataActive, setSurveysListDataActive] = useState([]);
  const [surveysListDataArchived, setSurveysListDataArchived] = useState([]);
  useEffect(() => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      const surveysActive = await fetchAllClinicianSurveys(
        orgId,
        clinicianId,
        false
      );
      setSurveysListDataActive(surveysActive);

      const surveysArchived = await fetchAllClinicianSurveys(
        orgId,
        clinicianId,
        true
      );
      setSurveysListDataArchived(surveysArchived);
    })();
  }, []);

  const [surveysPageNo, setSurveysPageNo] = useState(1);
  const handleSurveysPageNoClick = (p) => {
    setSurveysPageNo(p);
  };

  return (
    <Container>
      <div className="header">
        <h1>ALL SURVEYS</h1>
        <SearchButton variant="outlined" startIcon={<SearchIcon />}>
          SEARCH SURVEY
        </SearchButton>
      </div>

      <StyledBox>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Active" />
          <Tab label="Archived" />
        </Tabs>
      </StyledBox>

      {selectedTab === 0 && (
        <div>
          <SurveyCards
            surveysListData={surveysListDataActive}
            surveysPageNo={surveysPageNo}
          />
          <Pagination
            surveysListData={surveysListDataActive}
            surveysPageNo={surveysPageNo}
            handleSurveysPageNoClick={handleSurveysPageNoClick}
          />
        </div>
      )}
      {selectedTab === 1 && (
        <div>
          <SurveyCards
            surveysListData={surveysListDataArchived}
            surveysPageNo={surveysPageNo}
          />
          <Pagination
            surveysListData={surveysListDataArchived}
            surveysPageNo={surveysPageNo}
            handleSurveysPageNoClick={handleSurveysPageNoClick}
          />
        </div>
      )}
    </Container>
  );
};

export default AllSurveys;
