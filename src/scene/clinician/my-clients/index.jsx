import { useState, useContext, useEffect } from "react";
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
  deleteClient, // Import deleteClient
} from "@/firebase/clinicianRepo";
import {
  fetchClientSurveys,
  getTotalSurveysForClient,
} from "@/firebase/clinicianRepo";
import { useSnackbarContext } from "@/context/snackbarContext";

const noOfItemsOnOnePage = 6;

const MyClients = () => {
  const router = useRouter();
  const { breakpoint } = useContext(ClinicianContext);
  const { showSnackbar } = useSnackbarContext();

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
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      try {
        const clients = await fetchClients(orgId, clinicianId);
        setClientsListData(Object.entries(clients));
      } catch (err) {
        showSnackbar("error", err.message);
        console.error("An error occurred: " + err);
      }
    })();
  }, []);

  const addClientButtonClick = () => {
    router.push("/clinician/my-clients/add-new-client");
  };

  // Function to handle client deletion
  const handleDeleteClient = async (clientId) => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    try {
      await deleteClient(orgId, clinicianId, clientId);
      setClientsListData((prev) => prev.filter(([id]) => id !== clientId));
      showSnackbar("success", "Client deleted successfully");
    } catch (err) {
      showSnackbar("error", err.message);
      console.error("An error occurred while deleting the client: " + err);
    }
  };

  // Filtered Surveys
  const [filterFormData, setFilterFormData] = useState({});
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
      1,
      noOfItemsOnOnePage
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

  const [totalSurveysCount, setTotalSurveysCount] = useState(0);
  const [surveysPageNo, setSurveysPageNo] = useState(1);
  const handleSurveysPageNoClick = (p) => {
    setSurveysPageNo(p);
  };

  const [surveysListData, setSurveysListData] = useState([]);

  // First render: Get total surveys count and first surveys page
  useEffect(() => {
    if (isAddNewSurveyShown) return;

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
        showSnackbar("error", err.message);
        console.error("An error occurred: " + err);
      }
    })();

    return () => {
      setSurveysListData([]);
      setSurveysPageNo(1);
    };
  }, [selectedClientIndex, isAddNewSurveyShown]);

  // Data fetch on page increment
  useEffect(() => {
    if (surveysPageNo == 0 || surveysPageNo == 1) return;

    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    // Don't load data if page is decremented (data already loaded)
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
              surveysPageNo,
              noOfItemsOnOnePage
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
        } catch (err) {
          showSnackbar("error", err.message);
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
        const clients = await fetchClients(orgId, clinicianId);
        setClientsListData(Object.entries(clients));

        if (selectedClientIndex) {
          const count = await getTotalSurveysForClient(
            orgId,
            clinicianId,
            selectedClientIndex
          );
          setTotalSurveysCount(count);

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
        }
      } catch (err) {
        showSnackbar("error", err.message);
        console.error("An error occurred: " + err);
      }
    })();
  };

  return (
    <MainContainerBox>
      <HeadingBox>
        <MyClientsHeadingTypography variant="h4">
          My Clients
        </MyClientsHeadingTypography>
        <AddClientButton variant="contained" onClick={addClientButtonClick}>
          Add New Client
        </AddClientButton>
      </HeadingBox>

      <MainContentBox>
        <ClientListCard
          clientsListData={clientsListData}
          selectedIndex={selectedClientIndex}
          handleListItemClick={handleListItemClick}
          clientsPageNo={clientsPageNo}
          handleClientsPageNoClick={handleClientsPageNoClick}
          handleDeleteClient={handleDeleteClient} // Pass the handler
        />

        {isFilterPanelOpen && (
          <FilterPanel
            open={isFilterPanelOpen}
            toggleFilterPanelClick={toggleFilterPanelClick}
            updateFilteredSurveys={updateFilteredSurveys}
            selectedClientIndex={selectedClientIndex}
          />
        )}

        {selectedClientIndex && (
          <>
            <SurveysPerClient
              surveysListData={surveysListData}
              totalSurveysCount={totalSurveysCount}
              surveysPageNo={surveysPageNo}
              handleSurveysPageNoClick={handleSurveysPageNoClick}
              noOfItemsOnOnePage={noOfItemsOnOnePage}
              toggleAddNewSurveyCard={toggleAddNewSurveyCard}
              reloadPageData={reloadPageData}
            />

            {isAddNewSurveyShown && (
              <AddNewSurveyCard
                toggleAddNewSurveyCard={toggleAddNewSurveyCard}
                selectedClientIndex={selectedClientIndex}
                reloadPageData={reloadPageData}
              />
            )}
          </>
        )}
      </MainContentBox>
    </MainContainerBox>
  );
};

export default MyClients;