import { useState, useContext, useEffect, useRef } from "react";
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

    const data = { ...filterFormData, clientId: selectedClientIndex };

    (async () => {
      try {
        let count;
        if (Object.keys(filterFormData).length > 0) {
          count = await getTotalFilteredSurveysForClient(
            orgId,
            clinicianId,
            data,
            false
          );
          setTotalSurveysCount(count);
        } else {
          count = await getTotalSurveysForClient(
            orgId,
            clinicianId,
            selectedClientIndex
          );
          console.log(count);
          setTotalSurveysCount(count);
        }

        // If there are no surveys, set page no. as 0
        if (count == 0) {
          setSurveysPageNo(0);
          return;
        }

        let surveys;
        if (Object.keys(filterFormData).length > 0) {
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

        console.log(surveys);
        console.log(surveysPageNo);

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
        showSnackbar("error", err.message);
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
      <HeadingBox>
        <MyClientsHeadingTypography variant="h1">
          MY CLIENTS
        </MyClientsHeadingTypography>
        <AddClientButton onClick={addClientButtonClick}>
          Add Client
        </AddClientButton>
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
                reloadPageData={reloadPageData}
                noOfItemsOnOnePage={noOfItemsOnOnePage}
                filterFormData={filterFormData}
                handleResetFilter={handleResetFilter}
              />
            )}
          </>
        )}
      </MainContentBox>
      <FilterPanel
        isFilterPanelOpen={isFilterPanelOpen}
        toggleFilterPanelClick={toggleFilterPanelClick}
        updateFilteredSurveys={updateFilteredSurveys}
        ref={filterPanelRef}
      />
    </MainContainerBox>
  );
};

export default MyClients;
