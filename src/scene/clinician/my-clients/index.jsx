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
import { fetchClients } from "@/firebase/clinicianRepo";

// TODO: Show error as dropdown
// TODO: edit localStorage setting up when prachi is done implementing

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
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
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
                toggleFilterPanelClick={toggleFilterPanelClick}
                addNewSurveyClick={toggleAddNewSurveyCard}
                handleBackButtonClick={handleListItemClick}
                clientId={selectedClientIndex}
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
      />
    </MainContainerBox>
  );
};

export default MyClients;
