import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Header } from "@/shared/clinician/header/Header";
import { Sidebar } from "@/shared/clinician/sidebar/Sidebar";
import { Button } from "@mui/material";
import { aboutNavbarItems } from "@/utils";
import { ClinicianContext } from "@/context/OldClinicianContext";

const ClientAssessments = () => {
  const [token, setToken] = useState();
  const { clinicianInfo } = useContext(ClinicianContext);
  const [clientAssessmentsData, setclientAssessmentsData] = useState();
  const [originalClientAssessmentsData, setOriginalClientAssessmentsData] =
    useState();
  const [clinicianId, setclinicianId] = useState();

  //states for search
  const [searchQuery, setSearchQuery] = useState("");

  //states for message (after successful add of a patient id)
  const [displayMsg, setDisplayMsg] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const sendGetRequest = async () => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_PORT}/api/patient`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setOriginalClientAssessmentsData(response.data);
      setclientAssessmentsData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Check if clinicianInfo.clinician_id is defined and has a valid value
    //since clinician_id is coming from the context, it might be undefined when the api call in sendGetRequest is being made
    //hence we wait until the clinician_id has a value and then make the api call inside sendGetRequest
    if (clinicianInfo?.clinician_id) {
      //store the clinician_id coming from the context to a local state variable to be used later (for example to add a client/patient)
      setclinicianId(clinicianInfo.clinician_id);
      sendGetRequest();
    }
    // sendGetRequestSurveyData();
  }, [clinicianInfo?.clinician_id]);

  //for search
  useEffect(() => {
    // Filter clientAssessmentsData based on searchQuery
    if (searchQuery === "") {
      setclientAssessmentsData(originalClientAssessmentsData);
    } else {
      const filteredData = originalClientAssessmentsData.filter((client) =>
        client.patient_id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setclientAssessmentsData(filteredData);
    }
  }, [searchQuery, originalClientAssessmentsData]);

  //method to add a new client(patient) to the database
  const handleAddClient = async () => {
    try {
      await axios.post(
        `${SERVER_PORT}/api/clinician/generate-patientid`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      //calling the sendRequest method inorder to load the updated list of patient record
      sendGetRequest();
      setDisplayMsg("Client added successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  //method to download csv of all clients
  const downloadCSV = () => {
    axios({
      method: "get",
      url: `${SERVER_PORT}/api/survey/young-child/download/csv-all/clinician`,
      responseType: "blob",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(response.data);
        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.setAttribute("download", `survey_all_${clinicianId}.csv`);
        document.body.appendChild(tempLink);
        tempLink.click();
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
        // Handle error if necessary
      });
  };

  //Returns no of clients with assessments completed
  const getNoOfClientsWithAssesments = () => {
    let count = 0;
    clientAssessmentsData &&
      clientAssessmentsData.length &&
      clientAssessmentsData.map((client) => {
        if (client.completion_date !== "Not Available") count++;
      });
    return count;
  };

  return (
    <>
      <Header
        text="PUFI-2 - Clinical Dashboard"
        navbarItems={aboutNavbarItems}
      />
      {/* Page Content Sidebar and Notifications */}
      <div className="sidebar-content-wrapper">
        <Sidebar />

        <div className="client-assessments-wrapper">
          <p className="ta-c heading">
            <b>All Clients</b>
          </p>
          <div className="search-add-container">
            <input
              placeholder="Search by client #"
              className="search-client"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Add button to add a new client */}
            <button className="add-client-btn" onClick={handleAddClient}>
              Add Client
            </button>
          </div>
          {clientAssessmentsData &&
            clientAssessmentsData.length > 0 &&
            getNoOfClientsWithAssesments() > 0 && (
              <Button
                variant="contained"
                className="downloadCSVByClientBtn"
                onClick={downloadCSV}
              >
                Download CSV
              </Button>
            )}
          {displayMsg && <div class="display-message">{displayMsg}</div>}
          <p className="m-0 all-clients-heading">
            <b>All Clients:</b>
          </p>
          {/* Add headings for each column */}
          <div className="each-client-wrapper headings">
            <div className="m-2 flex-item-wide">
              <b>Client Id</b>
            </div>
            <div className="m-1 ml-1 flex-item" title="Last-Assessment">
              <b>Latest Survey Completion Date</b>
            </div>
            <div className="m-1 ml-1 flex-item">
              <b>View Assessment</b>
            </div>
          </div>
          {clientAssessmentsData && clientAssessmentsData.length ? (
            clientAssessmentsData.map((eachClient) => (
              <div className="each-client-wrapper" key={eachClient.patient_id}>
                <div className="m-0 color-green flex-item-wide">
                  <b>{eachClient.patient_id}</b>
                </div>
                <div className="m-0 ml-1 flex-item" title="Last-Assessment">
                  {eachClient.completion_date}
                </div>
                <div className="m-0 ml-1 flex-item">
                  {eachClient.completion_date == "Not Available" ? (
                    "Not Available"
                  ) : (
                    <a
                      href={eachClient.view_assessments_url}
                      className="color-green"
                    >
                      View Assessments
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-data-text">No Clients Found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientAssessments;
