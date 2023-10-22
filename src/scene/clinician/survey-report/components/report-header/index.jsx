import { useEffect, useState } from "react";
import { Container } from "./styled";
import { capitalizeEveryWord } from "../activity-analysis/helper/string-utils";

const ReportHeader = ({ survey }) => {
  const [surveyData, setSurveyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
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
  }, [survey]);
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
              Survey Id: <span>{survey["survey_id"]}</span>
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
