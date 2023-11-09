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
import CategoryBarChart from "./components/category-bar-chart";
import { groupByCategory } from "./components/category-bar-chart/helper/categories-helper";

//TODO:
//1. when client id will appear in the database, add client id to the surveyData
//2. when surveyCard will be finished (component in All surveys -> way to get to this page -> view scores)
//add to that component onClick event (on view scores) that will pass surveyId as a parameter to the url (or store survey Id in clinician context),
//and i will retrieve this surveyId here instead of hardcoded useState surveyId
const SurveyReport = () => {
  const [surveyId, setSurveyId] = useState("SCxUXNM1LeB9OTg8oMel");
  const [loading, setLoading] = useState(true);
  const [surveyData, setSurveyData] = useState({});

  useEffect(() => {
    const fetchSurvey = async (id) => {
      const survey = await getSurveyById(id);
      setSurveyData((prev) => survey);
      console.log("survey -> ", survey);
    };

    const authenticateAndFetch = async () => {
      setLoading(true);

      try {
        await signInWithEmailAndPassword(
          auth,
          "alla.gnatkiv@gmail.com",
          "pass-pufi2"
        ).then((user) => {
          console.log(user);
          fetchSurvey(surveyId);
        });
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };

    authenticateAndFetch();
  }, [surveyId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const surveyData = await getSurveyById(surveyId);
  //       setSurvey((prev) => surveyData);
  //     } catch (error) {
  //       console.error("Error fetching survey:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [surveyId]);

  const downloadCSV = () => {
    const download = async () => {
      // Extract data into CSV format
      const [csvHeader, csvData] = parseDataToCsvFormatYoungChild(surveyData);

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
    <>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Container>
          <h1>SUMMARY SCORES</h1>

          <div className="header-flex">
            <ReportHeader survey={surveyData} />
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
            <ActivityAnalysis survey={surveyData} questionId={questionId} />
          ))}

          <WeightedCalculation />

          <CategoryBarChart output={groupByCategory(surveyData)} />
        </Container>
      )}
    </>
  );
};

export default SurveyReport;
