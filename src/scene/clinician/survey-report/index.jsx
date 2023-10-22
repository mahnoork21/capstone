import { Button } from "@mui/material";
import ReportHeader from "./components/report-header";
import { Container } from "./styled";
import ActivityAnalysis from "./components/activity-analysis";
import { useEffect, useState } from "react";
import WeightedCalculation from "./components/weighted-calculation";
import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";
import { getSurveyById } from "@/firebase/surveyRepo";
import { parseDataToCsvFormatYoungChild } from "./helpers/download-helper";
import { Parser } from "json2csv";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

//TODO:
//1. when client id will appear in the database, add client id to the surveyData
//2. when surveyCard will be finished (component in All surveys -> way to get to this page -> view scores)
//add to that component onClick event (on view scores) that will pass surveyId as a parameter to the url (or store survey Id in clinician context),
//and i will retrieve this surveyId here instead of hardcoded useState surveyId
const SurveyReport = () => {
  const [surveyId, setSurveyId] = useState("XSxoZPRkwfObDw4iGWfr");
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const surveyData = await getSurveyById(surveyId);
        setSurvey((prev) => surveyData);
      } catch (error) {
        console.error("Error fetching survey:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surveyId]);

  const downloadCSV = () => {
    const download = async () => {
      // Extract data into CSV format
      const [csvHeader, csvData] = parseDataToCsvFormatYoungChild(survey);

      // Convert JSON data to CSV format
      const json2csvParser = new Parser({ csvHeader });
      const csv = json2csvParser.parse(csvData);

      // Create a Blob containing the CSV data
      const blob = new Blob([csv], { type: "text/csv" });

      return blob;
    };

    download()
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.setAttribute("download", `survey_${surveyId}.csv`);
        document.body.appendChild(tempLink);
        tempLink.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(tempLink);
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
        // Handle error if necessary
      });
  };
  return (
    <Container>
      <h1>SUMMARY SCORES</h1>

      <div className="header-flex">
        <ReportHeader survey={survey} />
        <Button
          className="download-button"
          variant="contained"
          startIcon={<img src="/icons/download.svg" alt="Download" />}
          onClick={downloadCSV}
        >
          Download CSV
        </Button>
      </div>

      {youngChildSurvey.map(({ questionId }) => (
        <ActivityAnalysis survey={survey} questionId={questionId} />
      ))}

      <WeightedCalculation />
    </Container>
  );
};

export default SurveyReport;
