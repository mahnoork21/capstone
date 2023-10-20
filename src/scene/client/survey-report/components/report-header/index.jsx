import { useEffect, useState } from "react";
import { Container } from "./styled";
import { getSurveyById } from "@/firebase/surveyRepo";
import { capitalizeEveryWord } from "../activity-analysis/helper/string-utils";
import { capitalize } from "@mui/material";

const ReportHeader = ({ surveyId }) => {
  const [surveyData, setSurveyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const survey = await getSurveyById(surveyId);
        setSurveyData((prevSurveyData) => ({
          surveyType: survey["survey_type"],
          surveyUpdated: survey["updated"]
            .toDate()
            .toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
        }));
      } catch (error) {
        console.error("Error fetching survey:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surveyId]);
  return (
    <Container>
      {loading ? (
        <p>Loading Data...</p>
      ) : (
        <div className="survey-data-container">
          <div className="survey-data">
            <p>
              Client ID: <span>Client123</span>
            </p>
            <p>
              Survey Id: <span>{surveyId}</span>
            </p>
          </div>
          <div className="survey-data">
            <p>
              Type: <span>{capitalizeEveryWord(surveyData.surveyType)}</span>
            </p>
            <p>
              Completed: <span>{surveyData.surveyUpdated}</span>
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};
export default ReportHeader;
