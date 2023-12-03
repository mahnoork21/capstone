import React from "react";
import { useEffect, useState } from "react";
import { Container } from "./styled";

const ReportHeader = ({ survey }) => {
  const [surveyData, setSurveyData] = useState({});

  useEffect(() => {
    if (survey) {
      const updatedDate = survey["updated"] ? survey["updated"].toDate() : null;
      setSurveyData(() => ({
        surveyType: survey["survey_type"],
        surveyCompleted: survey["is_submitted"],
        surveyUpdated: updatedDate
          ? updatedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "N/A",
      }));
    }
  }, [survey]);

  return (
    <Container>
      <div className="survey-data-container">
        <div className="survey-data">
          <p>
            Client ID: <span>{survey["client_id"]}</span>
          </p>
          <p>
            Survey Id: <span>{survey["survey_id"]}</span>
          </p>
        </div>
        <div className="survey-data">
          <p>
            Type: <span>{surveyData.surveyType}</span>
          </p>
          <p>
            {surveyData.surveyCompleted ? "Completed: " : "Last Updated: "}
            <span>
              {surveyData && surveyData.surveyUpdated !== undefined
                ? JSON.stringify(surveyData.surveyUpdated).replace(
                    /^"(.*)"$/,
                    "$1"
                  )
                : "N/A"}
            </span>
          </p>
        </div>
      </div>
    </Container>
  );
};
export default ReportHeader;
