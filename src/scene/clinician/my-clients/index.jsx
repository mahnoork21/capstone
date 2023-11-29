import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AddClientButton,
  MainContentBox,
  MyClientsHeadingTypography,
  MainContainerBox,
  HeadingBox,
} from "./styled";

import { ClinicianContext } from "@/context/ClinicianContext";
import ClientListCard from "./components/clientListCard";
import FilterPanel from "../../../shared/clinician/filterPanel";
import SurveysPerClient from "./components/surveysPerClient";
import AddNewSurveyCard from "./components/addNewSurveyCard";
import {
  fetchClients,
  fetchFilteredClinicianSurveys,
  getTotalFilteredSurveysForClient,
} from "@/firebase/clinicianRepo";
import {
  fetchClientSurveys,
  getTotalSurveysForClient,
} from "@/firebase/clinicianRepo";

// TODO: Show error as dropdown
// TODO: edit localStorage setting up when prachi is done implementing

const noOfItemsOnOnePage = 6;

const MyClients = () => {
  const router = useRouter();
  const { breakpoint } = useContext(ClinicianContext);

  const [clientsPageNo, setClientsPageNo] = useState(1);
  const handleClientsPageNoClick = (value) => {
    setClientsPageNo(value);
  };

  // For Selection of Clients list
  const [selectedClientIndex, setSelectedClientIndex] = useState();
  const handleListItemClick = (event, index) => {
    setSelectedClientIndex(index);
  };

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

  const [isAddNewSurveyShown, setIsAddNewSurveyShown] = useState(false);
  const toggleAddNewSurveyCard = () => setIsAddNewSurveyShown((p) => !p);

  const [clientsListData, setClientsListData] = useState([]);

  useEffect(() => {
    //remove this when prachi implements
    localStorage.setItem("orgId", "oZqnljuEU4b3jZtfHM9v");
    localStorage.setItem("clinicianId", "fWft9AvZD4Mc5fR33ka6Q8vOYil2");

    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      try {
        const clients = await fetchClients(orgId, clinicianId);
        setClientsListData(Object.entries(clients));
      } catch (err) {
        console.error("An error occurred: " + err);
      }
    })();
  }, []);

  const addClientButtonClick = () => {
    router.push("/clinician/my-clients/add-new-client");
  };

  const [filterFormData, setFilterFormData] = useState({});
  //Filtered Surveys
  const updateFilteredSurveys = async (formData) => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    setFilterFormData(formData);

    setSurveysPageNo(1);

    const data = { ...formData, clientId: selectedClientIndex };

    const resultSurvey = await fetchFilteredClinicianSurveys(
      orgId,
      clinicianId,
      data,
      false,
      1
    );

    const count = await getTotalFilteredSurveysForClient(
      orgId,
      clinicianId,
      data,
      false
    );
    setTotalSurveysCount(count);

    if (count) {
      setSurveysListData(resultSurvey);
    } else {
      setSurveysListData([]);
    }
  };

  //Change it without using unsubscribe or without loding twice snapshot
  // useEffect(() => {
  //   const orgId = localStorage.getItem("orgId");
  //   const clinicianId = localStorage.getItem("clinicianId");

  //   if (selectedClientIndex) {
  //     const surveysRef = collection(
  //       db,
  //       "Organization",
  //       orgId,
  //       "Clinician",
  //       clinicianId,
  //       "Survey"
  //     );
  //     const q = query(surveysRef);

  //     const unsubscribe = onSnapshot(q, async (snapshot) => {
  //       const surveys = await fetchClientSurveys(
  //         orgId,
  //         clinicianId,
  //         selectedClientIndex,
  //         surveysPageNo
  //       );

  //       if (Object.keys(filterFormData).length > 0) {
  //         updateFilteredSurveys(filterFormData);
  //       } else {
  //         setSurveysListData(surveys);
  //       }
  //     });

  //     return () => unsubscribe();
  //   }
  // }, [selectedClientIndex, isAddNewSurveyShown, filterFormData]);

  //Handling state back from the parent component

  const [totalSurveysCount, setTotalSurveysCount] = useState(0);
  const [surveysPageNo, setSurveysPageNo] = useState(1);
  const handleSurveysPageNoClick = (p) => {
    setSurveysPageNo(p);
  };

  const [surveysListData, setSurveysListData] = useState([]);

  // First render: Get total surveys count and first surveys page
  useEffect(() => {
    setFilterFormData({});
    if (!selectedClientIndex) return;

    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      try {
        const count = await getTotalSurveysForClient(
          orgId,
          clinicianId,
          selectedClientIndex
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
          selectedClientIndex,
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
  }, [selectedClientIndex]);

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
          let surveys;
          if (Object.keys(filterFormData).length > 0) {
            const data = { ...filterFormData, clientId: selectedClientIndex };
            surveys = await fetchFilteredClinicianSurveys(
              orgId,
              clinicianId,
              data,
              false,
              surveysPageNo
            );
          } else {
            surveys = await fetchClientSurveys(
              orgId,
              clinicianId,
              selectedClientIndex,
              surveysPageNo
            );
          }

          setSurveysListData((s) => s.concat(surveys));
          // setSurveysListData(surveys);
        } catch (err) {
          console.error("An error occurred: " + err);
        }
      })();
    }
  }, [surveysPageNo]);

  return (
    <MainContainerBox>
      <HeadingBox>
        <MyClientsHeadingTypography variant="h1">
          MY CLIENTS
        </MyClientsHeadingTypography>
        {breakpoint === "mobile" && (
          <AddClientButton onClick={addClientButtonClick}>
            Add Client
          </AddClientButton>
        )}
      </HeadingBox>
      <MainContentBox>
        {(breakpoint === "desktop" || !selectedClientIndex) && (
          <ClientListCard
            clientsListData={clientsListData}
            clientsPageNo={clientsPageNo}
            handleClientsPageNoClick={handleClientsPageNoClick}
            selectedIndex={selectedClientIndex}
            handleListItemClick={handleListItemClick}
          />
        )}

        {(breakpoint === "desktop" || !!selectedClientIndex) && (
          <>
            {isAddNewSurveyShown && (
              <AddNewSurveyCard
                toggleForm={toggleAddNewSurveyCard}
                clientId={selectedClientIndex}
              />
            )}
            {!isAddNewSurveyShown && selectedClientIndex && (
              <SurveysPerClient
                surveysListData={surveysListData}
                totalSurveysCount={totalSurveysCount}
                surveysPageNo={surveysPageNo}
                handleSurveysPageNoClick={handleSurveysPageNoClick}
                toggleFilterPanelClick={toggleFilterPanelClick}
                addNewSurveyClick={toggleAddNewSurveyCard}
                handleBackButtonClick={handleListItemClick}
              />
            )}
          </>
        )}
      </MainContentBox>
      {breakpoint === "desktop" && (
        <AddClientButton onClick={addClientButtonClick}>
          Add Client
        </AddClientButton>
      )}
      <FilterPanel
        isFilterPanelOpen={isFilterPanelOpen}
        toggleFilterPanelClick={toggleFilterPanelClick}
        updateFilteredSurveys={updateFilteredSurveys}
      />
    </MainContainerBox>
  );
};

export default MyClients;
