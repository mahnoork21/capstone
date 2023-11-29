import React, { useEffect, useState } from "react";
import { Container, InnerContainer, SearchButton, StyledBox } from "./styled";
import SearchIcon from "@mui/icons-material/Search";
import { Tab, Tabs } from "@mui/material";
import {
  fetchAllClinicianSurveys,
  fetchFilteredClinicianSurveys,
  getTotalAllClinicianSurveys,
  getTotalFilteredSurveysForClient,
} from "@/firebase/clinicianRepo";
import { MainContainerBox } from "../my-clients/styled";
import FilterPanel from "@/shared/clinician/filterPanel";
import Pagination from "@/shared/clinician/pagination";
import SurveyCards from "@/shared/clinician/surveyCards";

const noOfItemsOnOnePage = 6;

const AllSurveys = () => {
  //Surveys List Data for Active and Archived Surveys
  const [surveysListDataActive, setSurveysListDataActive] = useState([]);
  const [surveysListDataArchived, setSurveysListDataArchived] = useState([]);

  // TODO: Cahnge it
  // useEffect(() => {
  //   const orgId = localStorage.getItem("orgId");
  //   const clinicianId = localStorage.getItem("clinicianId");

  //   const surveysRef = collection(
  //     db,
  //     "Organization",
  //     orgId,
  //     "Clinician",
  //     clinicianId,
  //     "Survey"
  //   );
  //   const q = query(surveysRef);

  //   const unsubscribe = onSnapshot(q, async (snapshot) => {
  //     const active = await fetchAllClinicianSurveys(orgId, clinicianId, false);
  //     setSurveysListDataActive(active);

  //     const archived = await fetchAllClinicianSurveys(orgId, clinicianId, true);
  //     setSurveysListDataArchived(archived);
  //   });

  //   return () => unsubscribe();
  // }, []);

  //Surveys Page Number
  const [surveysPageNo, setSurveysPageNo] = useState(1);
  const handleSurveysPageNoClick = (p) => {
    setSurveysPageNo(p);
  };

  const [totalActiveSurveysCount, setTotalActiveSurveysCount] = useState(0);
  const [totalArchivedSurveysCount, setTotalArchivedSurveysCount] = useState(0);

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

  // First render: Get total surveys count and first surveys page
  useEffect(() => {
    setFilterFormData({});

    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      try {
        const countActive = await getTotalAllClinicianSurveys(
          orgId,
          clinicianId,
          false
        );
        setTotalActiveSurveysCount(countActive);

        const countArchived = await getTotalAllClinicianSurveys(
          orgId,
          clinicianId,
          true
        );
        setTotalArchivedSurveysCount(countArchived);

        // If there are no surveys, set page no. as 0
        if (
          (selectedTab === 0 && countActive === 0) ||
          (selectedTab === 1 && countArchived === 0)
        ) {
          setSurveysPageNo(0);
          return;
        }

        const resultSurveysActive = await fetchAllClinicianSurveys(
          orgId,
          clinicianId,
          false,
          1
        );

        const resultSurveysArchived = await fetchAllClinicianSurveys(
          orgId,
          clinicianId,
          true,
          1
        );

        if (countActive > 0) {
          setSurveysListDataActive(resultSurveysActive);
        } else {
          setSurveysListDataActive([]);
        }

        if (countArchived > 0) {
          setSurveysListDataArchived(resultSurveysArchived);
        } else {
          setSurveysListDataArchived([]);
        }
      } catch (err) {
        console.error("An error occurred: " + err);
      }
    })();

    return () => {
      setSurveysListDataActive([]);
      setSurveysListDataArchived([]);
      setSurveysPageNo(1);
    };
  }, [selectedTab]);

  //Filtered Surveys
  //TODO: finish filtering feature as in my-clients
  const [filterFormData, setFilterFormData] = useState({});
  const updateFilteredSurveys = async (formData) => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    setFilterFormData(formData);

    setSurveysPageNo(1);

    const resultSurveysActive = await fetchFilteredClinicianSurveys(
      orgId,
      clinicianId,
      formData,
      false,
      1
    );

    const resultSurveysArchived = await fetchFilteredClinicianSurveys(
      orgId,
      clinicianId,
      formData,
      true,
      1
    );

    const countActive = await getTotalFilteredSurveysForClient(
      orgId,
      clinicianId,
      formData,
      false
    );
    setTotalActiveSurveysCount(countActive);

    const countArchived = await getTotalFilteredSurveysForClient(
      orgId,
      clinicianId,
      formData,
      true
    );
    setTotalArchivedSurveysCount(countArchived);

    if (countActive) {
      setSurveysListDataActive(resultSurveysActive);
    } else {
      setSurveysListDataActive([]);
    }

    if (countArchived) {
      setSurveysListDataArchived(resultSurveysArchived);
    } else {
      setSurveysListDataArchived([]);
    }

    setSurveysPageNo(1);
  };

  // Data fetch on page increment
  useEffect(() => {
    if (surveysPageNo == 0 || surveysPageNo == 1) return;

    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    const surveysListData =
      selectedTab === 0 ? surveysListDataActive : surveysListDataArchived;

    const isArchived = selectedTab === 1;

    //Don't load data if page is decremented (data already loaded)
    const dataLoadedTillPageNo = Math.ceil(
      surveysListData.length / noOfItemsOnOnePage
    );

    if (dataLoadedTillPageNo < surveysPageNo) {
      (async () => {
        try {
          let surveys;
          if (Object.keys(filterFormData).length > 0) {
            surveys = await fetchFilteredClinicianSurveys(
              orgId,
              clinicianId,
              filterFormData,
              isArchived,
              surveysPageNo
            );
          } else {
            surveys = await fetchAllClinicianSurveys(
              orgId,
              clinicianId,
              isArchived,
              surveysPageNo
            );
          }

          if (selectedTab === 0) {
            setSurveysListDataActive((s) => s.concat(surveys));
          } else {
            setSurveysListDataArchived((s) => s.concat(surveys));
          }
        } catch (err) {
          console.error("An error occurred: " + err);
        }
      })();
    }
  }, [surveysPageNo]);

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
            totalSurveysCount={
              selectedTab === 0
                ? totalActiveSurveysCount
                : totalArchivedSurveysCount
            }
            surveysListData={
              selectedTab === 0
                ? surveysListDataActive.length
                : surveysListDataArchived.length
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
