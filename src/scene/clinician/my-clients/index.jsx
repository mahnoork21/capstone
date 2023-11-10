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
import { fetchClientSurveys, fetchClients } from "@/firebase/clinicianRepo";

// Temporary static data
// const clientsListData = [
//   {
//     clientId: "Client-12345",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-123",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Client-125",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Client-135",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Client-235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Client1235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Clien-1235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Cliet-1235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Clint-1235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Clent-1235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235Cient-1235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1235Client-1235lient-1235",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-123456",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-123457",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-12348",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-12349",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1234510",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1234511",
//     clientAddDate: "Added - September 16th, 2023",
//   },
//   {
//     clientId: "Client-1234512",
//     clientAddDate: "Added - September 16th, 2023",
//   },
// ];
// const surveysListData = [
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-9844a2d9153",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-9844a2d9152",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-9844a2d9132",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-9844a2d9532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-9844a2d1532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-9844a291532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-9844ad91532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-98442d91532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-43b-849f-984a2d91532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-984a2d91532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-944a2d91532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f-844a2d91532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849f9844a2d91532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
//   {
//     clientId: "client123",
//     surveyId: "849be0e3aea7-433b-849-9844a2d91532",
//     type: "Older Child(Parent)",
//     creationDate: "10/09/2023",
//     completionDate: undefined,
//     percentageComplete: 40,
//   },
// ];

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

  useEffect(() => {
    orgId = localStorage.getItem("orgId");
    clinicianId = localStorage.getItem("clinicianId");

    if (selectedClientIndex)
      (async () => {
        const surveys = await fetchClientSurveys(
          orgId,
          clinicianId,
          selectedClientIndex
        );
        setSurveysListData(surveys);
      })();
  }, [selectedClientIndex, isAddNewSurveyShown]);

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
      />
    </MainContainerBox>
  );
};

export default MyClients;
