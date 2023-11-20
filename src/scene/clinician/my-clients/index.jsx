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
  fetchClientSurveys,
  fetchClients,
  fetchClinicianSurveyById,
  fetchFilteredClinicianSurveys,
} from "@/firebase/clinicianRepo";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const MyClients = () => {
  const router = useRouter();
  const { breakpoint } = useContext(ClinicianContext);

  const [clientsPageNo, setClientsPageNo] = useState(1);
  const handleClientsPageNoClick = (value) => {
    setClientsPageNo(value);
  };

  const [surveysPageNo, setSurveysPageNo] = useState(1);
  const handleSurveysPageNoClick = (p) => {
    setSurveysPageNo(p);
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

  let orgId, clinicianId;
  useEffect(() => {
    localStorage.setItem("orgId", "oZqnljuEU4b3jZtfHM9v");
    localStorage.setItem("clinicianId", "fWft9AvZD4Mc5fR33ka6Q8vOYil2");
    orgId = localStorage.getItem("orgId");
    clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      const clients = await fetchClients(orgId, clinicianId);
      setClientsListData(Object.entries(clients));
    })();
  }, []);

  const [surveysListData, setSurveysListData] = useState([]);

  const addClientButtonClick = () => {
    router.push("/clinician/my-clients/add-new-client");
  };

  const [filterFormData, setFilterFormData] = useState({});
  //Filtered Surveys
  const updateFilteredSurveys = async (formData, searchBy) => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");
    setFilterFormData(formData);

    const data = { ...formData, clientId: selectedClientIndex };

    if (
      searchBy === "surveyId" &&
      formData.surveyId !== null &&
      formData.surveyId !== undefined &&
      formData.surveyId !== ""
    ) {
      const resultSurvey = await fetchClinicianSurveyById(
        orgId,
        clinicianId,
        selectedClientIndex,
        formData.surveyId
      );
      if (resultSurvey) {
        setSurveysListData([resultSurvey]);
      } else {
        setSurveysListData([]);
      }
    } else {
      const resultSurvey = await fetchFilteredClinicianSurveys(
        orgId,
        clinicianId,
        data
      );

      if (resultSurvey.length > 0) {
        setSurveysListData(resultSurvey);
      } else {
        setSurveysListData([]);
      }
    }

    setSurveysPageNo(1);
  };

  useEffect(() => {
    orgId = localStorage.getItem("orgId");
    clinicianId = localStorage.getItem("clinicianId");

    if (selectedClientIndex) {
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
        const surveys = await fetchClientSurveys(
          orgId,
          clinicianId,
          selectedClientIndex
        );

        if (Object.keys(filterFormData).length > 0) {
          updateFilteredSurveys(filterFormData);
        } else {
          setSurveysListData(surveys);
        }
      });

      return () => unsubscribe();
    }
  }, [selectedClientIndex, isAddNewSurveyShown, filterFormData]);

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
                surveysPageNo={surveysPageNo}
                handleSurveysPageNoClick={handleSurveysPageNoClick}
                toggleFilterPanelClick={toggleFilterPanelClick}
                addNewSurveyClick={toggleAddNewSurveyCard}
                handleListItemClick={handleListItemClick}
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
