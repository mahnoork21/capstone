import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ClinicianContext } from "@/context/ClinicianContext";
import {
  AddClientButton,
  EmptyContainer,
  MainContainer,
  StyledButton,
} from "./styled";
import Button from "@mui/material/Button";
import {
  doesClinicianHaveSurveys,
  fetchClinicianSurveysByStatus,
  getTotalClinicianSurveysByStatus,
} from "@/firebase/clinicianRepo";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import SurveyCards from "./components/survey-cards";
import { useSnackbarContext } from "@/context/snackbarContext";

const Dashboard = () => {
  const router = useRouter();
  const { breakpoint } = useContext(ClinicianContext);
  const { showSnackbar } = useSnackbarContext();

  const [loading, setLoading] = useState(true);
  const [hasSurveys, setHasSurveys] = useState(false);

  const [totalSurveysCompleted, setTotalSurveysCompleted] = useState(0);
  const [totalSurveysInProgress, setTotalSurveysInProgress] = useState(0);
  const [totalSurveysPending, setTotalSurveysPending] = useState(0);

  const fetchData = async () => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    try {
      setLoading(true);

      const doesHaveSurveys = await doesClinicianHaveSurveys(
        orgId,
        clinicianId
      );
      setHasSurveys(doesHaveSurveys);

      const totalCompleted = await getTotalClinicianSurveysByStatus(
        orgId,
        clinicianId,
        false,
        "Complete"
      );

      const totalInProgress = await getTotalClinicianSurveysByStatus(
        orgId,
        clinicianId,
        false,
        "In-progress"
      );

      const totalPending = await getTotalClinicianSurveysByStatus(
        orgId,
        clinicianId,
        false,
        "Pending"
      );

      setTotalSurveysCompleted(totalCompleted);
      setTotalSurveysInProgress(totalInProgress);
      setTotalSurveysPending(totalPending);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Surveys List Data for Active and Archived Surveys
  const [surveysListDataCompleted, setSurveysListDataCompleted] = useState([]);
  const [surveysListDataInProgress, setSurveysListDataInProgress] = useState(
    []
  );
  const [surveysListDataPending, setSurveysListDataPending] = useState([]);

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

    const unsubscribe = onSnapshot(q, async () => {
      const complete = await fetchClinicianSurveysByStatus(
        orgId,
        clinicianId,
        "Complete"
      );
      setSurveysListDataCompleted(complete);

      const inProgress = await fetchClinicianSurveysByStatus(
        orgId,
        clinicianId,
        "In-progress"
      );
      setSurveysListDataInProgress(inProgress);

      const pending = await fetchClinicianSurveysByStatus(
        orgId,
        clinicianId,
        "Pending"
      );
      setSurveysListDataPending(pending);
    });

    return () => unsubscribe();
  }, []);

  const addClientButtonClick = () => {
    router.push("/clinician/my-clients/add-new-client");
  };

  const viewAllClickHandler = (status) => {
    router.push({
      pathname: "/clinician/all-surveys",
      query: { status },
    });
  };

  const reloadPageData = () => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    (async () => {
      try {
        const doesHaveSurveys = await doesClinicianHaveSurveys(
          orgId,
          clinicianId
        );
        setHasSurveys(doesHaveSurveys);

        const totalCompleted = await getTotalClinicianSurveysByStatus(
          orgId,
          clinicianId,
          false,
          "Complete"
        );
        setTotalSurveysCompleted(totalCompleted);

        const totalInProgress = await getTotalClinicianSurveysByStatus(
          orgId,
          clinicianId,
          false,
          "In-progress"
        );
        setTotalSurveysInProgress(totalInProgress);

        const totalPending = await getTotalClinicianSurveysByStatus(
          orgId,
          clinicianId,
          false,
          "Pending"
        );
        setTotalSurveysPending(totalPending);

        const complete = await fetchClinicianSurveysByStatus(
          orgId,
          clinicianId,
          "Complete"
        );
        setSurveysListDataCompleted(complete);

        const inProgress = await fetchClinicianSurveysByStatus(
          orgId,
          clinicianId,
          "In-progress"
        );
        setSurveysListDataInProgress(inProgress);

        const pending = await fetchClinicianSurveysByStatus(
          orgId,
          clinicianId,
          "Pending"
        );
        setSurveysListDataPending(pending);
      } catch (err) {
        showSnackbar("error", err.message);
        console.error("An error occurred: " + err);
      }
    })();
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : !hasSurveys ? (
        <EmptyContainer>
          <Image
            src="/empty-copyholders.svg"
            width={breakpoint === "desktop" ? 322 : 200}
            height={breakpoint === "desktop" ? 314 : 195}
            alt="Empty Copyholders"
          />
          <p>You have not added any clients</p>
          <Button variant="contained" onClick={addClientButtonClick}>
            Add Client
          </Button>
        </EmptyContainer>
      ) : (
        <MainContainer>
          <div className="header">
            <h1>DASHBOARD</h1>
            <AddClientButton variant="contained" onClick={addClientButtonClick}>
              Add Client
            </AddClientButton>
          </div>
          <div className="outer-cards-container">
            {totalSurveysCompleted > 0 && (
              <div className="inner-cards-container">
                <div className="cards-status-heading completed">
                  <span>
                    Recently Completed Surveys ({totalSurveysCompleted})
                  </span>
                  <StyledButton
                    variant="text"
                    onClick={() => viewAllClickHandler("complete")}
                  >
                    View all
                  </StyledButton>
                </div>

                <SurveyCards
                  surveysListData={surveysListDataCompleted}
                  reloadPageData={reloadPageData}
                />
              </div>
            )}
            {totalSurveysInProgress > 0 && (
              <div>
                <div className="cards-status-heading">
                  <span>In-Progress Surveys ({totalSurveysInProgress})</span>
                  <StyledButton
                    variant="text"
                    onClick={() => viewAllClickHandler("in-progress")}
                  >
                    View all
                  </StyledButton>
                </div>
                <SurveyCards
                  surveysListData={surveysListDataInProgress}
                  reloadPageData={reloadPageData}
                />
              </div>
            )}
            {totalSurveysPending > 0 && (
              <div>
                <div className="cards-status-heading">
                  <span>Pending Surveys ({totalSurveysPending})</span>
                  <StyledButton
                    variant="text"
                    onClick={() => viewAllClickHandler("pending")}
                  >
                    View all
                  </StyledButton>
                </div>
                <SurveyCards
                  surveysListData={surveysListDataPending}
                  reloadPageData={reloadPageData}
                />
              </div>
            )}
          </div>
        </MainContainer>
      )}
    </>
  );
};

export default Dashboard;
