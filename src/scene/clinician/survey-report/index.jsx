import { Button } from "@mui/material";
import ReportHeader from "./components/report-header";
import { Container, StyledTab, StyledTabs } from "./styled";
import ActivityAnalysis from "./components/activity-analysis";
import { useContext, useEffect, useState } from "react";
import WeightedCalculation from "./components/weighted-calculation";
import { getSurveyById } from "@/firebase/surveyRepo";
import { parseDataToCsvFormatYoungChild } from "./helpers/download-helper";
import { Parser } from "json2csv";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import TableViewIcon from "@mui/icons-material/TableView";
import CategoryBarChart from "./components/category-bar-chart";
import { groupByCategory } from "./components/category-bar-chart/helper/categories-helper";
import RawScores from "./components/raw-scores";
import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";
import { ClinicianContext } from "@/context/ClinicianContext";

const SurveyReport = ({ surveyId }) => {
  const [loading, setLoading] = useState(true);
  const [surveyData, setSurveyData] = useState({});
  const [groupedSurveyByCategory, setGroupedSurveyByCategory] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const { currentUser } = useContext(ClinicianContext);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    const fetchSurvey = async (orgId, clinicianId, surveyId) => {
      setLoading(true);
      try {
        const survey = await getSurveyById(orgId, clinicianId, surveyId);
        setSurveyData(() => survey);
        setGroupedSurveyByCategory(() => groupByCategory(survey));
        setLoading(false);
      } catch (error) {
        console.log("Error occured in SurveyReport - ", error);
        setLoading(false);
      }
    };

    fetchSurvey(orgId, clinicianId, surveyId);
  }, [surveyId, currentUser]);

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

  const printSummary = () => {
    window.print();
  };

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Container>
          <h1>
            SUMMARY SCORES {!surveyData["is_submitted"] && " - IN PROGRESS"}
          </h1>

          <div className="header-flex">
            <ReportHeader survey={surveyData} />
            <div className="header-buttons">
              <Button
                className="download-button"
                variant="contained"
                startIcon={<img src="/icons/download.svg" alt="Download" />}
                onClick={downloadCSV}
              >
                Download to CSV/Excel File
              </Button>
              <Button
                className="download-button"
                variant="contained"
                startIcon={<img src="/icons/download.svg" alt="Print" />}
                onClick={printSummary}
              >
                Print/Save to PDF
              </Button>
            </div>
          </div>

          <StyledTabs value={tabValue} onChange={handleTabValueChange}>
            <StyledTab
              icon={<PieChartOutlineIcon />}
              label="Charts"
              iconPosition="start"
              id="simple-tab-0"
            />
            <StyledTab
              icon={<TableViewIcon />}
              iconPosition="start"
              label="Raw Score"
              id="simple-tab-1"
            />
          </StyledTabs>

          {tabValue === 0 ? (
            <>
              {youngChildSurvey.map(({ questionId }) => (
                <ActivityAnalysis
                  key={questionId}
                  survey={surveyData}
                  questionId={questionId}
                />
              ))}

              <CategoryBarChart output={groupedSurveyByCategory} />
              <WeightedCalculation />
            </>
          ) : (
            <RawScores surveyData={surveyData} />
          )}
        </Container>
      )}
    </>
  );
};

export default SurveyReport;
