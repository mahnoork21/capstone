import React, { useEffect, useRef, useState } from "react";
import { Container, InnerContainer, SearchButton, StyledBox } from "./styled";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Tab, Tabs } from "@mui/material";
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
import FilterInfo from "@/shared/clinician/filterInfo";
import { useRouter } from "next/router";

const noOfItemsOnOnePage = 9;

const AllSurveys = () => {
  //Getting status of the surveys from url
  const router = useRouter();
  const { status } = router.query;

  //Surveys List Data for Active and Archived Surveys
  const [surveysListDataActive, setSurveysListDataActive] = useState([]);
  const [surveysListDataArchived, setSurveysListDataArchived] = useState([]);

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
    if (status) {
      setFilterFormData({
        clientId: "",
        surveyType: "",
        surveyStatus: {
          Complete: status === "complete",
          "In-progress": status === "in-progress",
          Pending: status === "pending",
        },
        fromDate: "",
        toDate: "",
      });
    } else {
      setFilterFormData({});
    }

    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    if (status) {
      console.log("status");
      updateFilteredSurveys(filterFormData);
    } else {
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
    }

    return () => {
      setSurveysListDataActive([]);
      setSurveysListDataArchived([]);
      setSurveysPageNo(1);
    };
  }, [selectedTab, status]);

  //Filtered Surveys
  const [filterFormData, setFilterFormData] = useState({
    clientId: "",
    surveyType: "",
    surveyStatus: {
      Complete: status === "complete",
      "In-progress": status === "in-progress",
      Pending: status === "pending",
    },
    fromDate: "",
    toDate: "",
  });
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
      1,
      noOfItemsOnOnePage
    );

    const resultSurveysArchived = await fetchFilteredClinicianSurveys(
      orgId,
      clinicianId,
      formData,
      true,
      1,
      noOfItemsOnOnePage
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
              surveysPageNo,
              noOfItemsOnOnePage
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

  const reloadPageData = () => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      try {
        let countActive;
        let countArchived;
        if (Object.keys(filterFormData).length > 0) {
          countActive = await getTotalFilteredSurveysForClient(
            orgId,
            clinicianId,
            filterFormData,
            false
          );
          setTotalActiveSurveysCount(countActive);

          countArchived = await getTotalFilteredSurveysForClient(
            orgId,
            clinicianId,
            filterFormData,
            true
          );
          setTotalArchivedSurveysCount(countArchived);
        } else {
          countActive = await getTotalAllClinicianSurveys(
            orgId,
            clinicianId,
            false
          );
          setTotalActiveSurveysCount(countActive);

          countArchived = await getTotalAllClinicianSurveys(
            orgId,
            clinicianId,
            true
          );
          setTotalArchivedSurveysCount(countArchived);
        }

        // If there are no surveys, set page no. as 0
        if (
          (selectedTab === 0 && countActive === 0) ||
          (selectedTab === 1 && countArchived === 0)
        ) {
          setSurveysPageNo(0);
          return;
        }

        let surveysActive;
        let surveysArchived;
        if (Object.keys(filterFormData).length > 0) {
          surveysActive = await fetchFilteredClinicianSurveys(
            orgId,
            clinicianId,
            filterFormData,
            false,
            surveysPageNo,
            noOfItemsOnOnePage
          );

          surveysArchived = await fetchFilteredClinicianSurveys(
            orgId,
            clinicianId,
            filterFormData,
            true,
            surveysPageNo,
            noOfItemsOnOnePage
          );
        } else {
          surveysActive = await fetchAllClinicianSurveys(
            orgId,
            clinicianId,
            false,
            surveysPageNo
          );

          surveysArchived = await fetchAllClinicianSurveys(
            orgId,
            clinicianId,
            true,
            surveysPageNo
          );
        }

        let surveys = selectedTab === 0 ? surveysActive : surveysArchived;
        let setSurveysListData =
          selectedTab === 0
            ? setSurveysListDataActive
            : setSurveysListDataArchived;

        if (surveys.length == 0) {
          setSurveysPageNo((p) => (p == 0 ? 0 : --p));
        } else {
          setSurveysListData((s) => {
            const newSurveys = s.splice(
              0,
              (surveysPageNo - 1) * noOfItemsOnOnePage
            );
            return newSurveys.concat(surveys);
          });
        }
      } catch (err) {
        console.error("An error occurred: " + err);
      }
    })();
  };

  const filterPanelRef = useRef();
  const handleResetFilter = () => {
    updateFilteredSurveys({
      clientId: "",
      surveyType: "",
      surveyStatus: "",
      fromDate: "",
      toDate: "",
    });
    filterPanelRef.current.resetFormValues();
  };

  return (
    <MainContainerBox>
      <Container>
        <div className="header">
          <h1>ALL SURVEYS</h1>
          {Object.values(filterFormData).some((value) => value !== "") && (
            <FilterInfo formData={filterFormData} />
          )}
          <div className="filterButtons">
            <SearchButton
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={toggleFilterPanelClick}
            >
              SEARCH SURVEY
            </SearchButton>
            <Button primary variant="contained" onClick={handleResetFilter}>
              Reset Filter
            </Button>
          </div>
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
            reloadPageData={reloadPageData}
            noOfItemsOnOnePage={noOfItemsOnOnePage}
          />

          <Pagination
            totalSurveysCount={
              selectedTab === 0
                ? totalActiveSurveysCount
                : totalArchivedSurveysCount
            }
            surveysPageNo={surveysPageNo}
            handleSurveysPageNoClick={handleSurveysPageNoClick}
            noOfItemsOnOnePage={noOfItemsOnOnePage}
          />
        </InnerContainer>
      </Container>

      <FilterPanel
        isFilterPanelOpen={isFilterPanelOpen}
        toggleFilterPanelClick={toggleFilterPanelClick}
        updateFilteredSurveys={updateFilteredSurveys}
        ref={filterPanelRef}
      />
    </MainContainerBox>
  );
};

export default AllSurveys;
