import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
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
} from "@/firebase/clinicianRepo";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import SurveyCards from "./components/survey-cards";

const Dashboard = () => {
  const router = useRouter();
  const { breakpoint } = useContext(ClinicianContext);

  const [loading, setLoading] = useState(true);
  const [hasSurveys, setHasSurveys] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      localStorage.setItem("orgId", "oZqnljuEU4b3jZtfHM9v");
      localStorage.setItem("clinicianId", "fWft9AvZD4Mc5fR33ka6Q8vOYil2");
      const orgId = localStorage.getItem("orgId");
      const clinicianId = localStorage.getItem("clinicianId");

      try {
        setLoading(true);

        const doesHaveSurveys = await doesClinicianHaveSurveys(
          orgId,
          clinicianId
        );

        setHasSurveys(doesHaveSurveys);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

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

  const viewAllClickHandler = () => {
    router.push("/clinician/all-surveys");
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
            <div className="inner-cards-container">
              <div className="cards-status-heading completed">
                <span>
                  Recently Completed Surveys ({surveysListDataCompleted.length})
                </span>
                <StyledButton variant="text" onClick={viewAllClickHandler}>
                  View all
                </StyledButton>
              </div>

              <SurveyCards surveysListData={surveysListDataCompleted} />
            </div>
            <div>
              <div className="cards-status-heading">
                <span>
                  In-Progress Surveys ({surveysListDataInProgress.length})
                </span>
                <StyledButton variant="text" onClick={viewAllClickHandler}>
                  View all
                </StyledButton>
              </div>
              <SurveyCards surveysListData={surveysListDataInProgress} />
            </div>
            <div>
              <div className="cards-status-heading">
                <span>Pending Surveys ({surveysListDataPending.length})</span>
                <StyledButton variant="text" onClick={viewAllClickHandler}>
                  View all
                </StyledButton>
              </div>
              <SurveyCards surveysListData={surveysListDataPending} />
            </div>
          </div>
        </MainContainer>
      )}
    </>
  );
};

export default Dashboard;
