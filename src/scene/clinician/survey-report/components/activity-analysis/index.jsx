import { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import ScoresTable from "../scores-table";
import { getSurveyById } from "@/firebase/surveyRepo";
import { Container, PieWrapper, SubContainer, TableWrapper } from "./styled";
import { getScores } from "./helper/scores-helper";
import { getData, options } from "./helper/chart-helper";
import { getTotalWeightedScore } from "./helper/weighted-calculation-helper";
import ColorLabels from "../color-labels";
import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";

const ActivityAnalysis = ({ survey, questionId }) => {
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);

        const scores = getScores(survey, questionId);

        setScores((prevScores) => scores);

        const data = getData(scores);

        setData((prevData) => data);
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
        <p>Loading data...</p>
      ) : (
        <>
          <h2>
            {
              youngChildSurvey.find(
                (question) => question.questionId === questionId
              ).label
            }
          </h2>
          <SubContainer>
            <PieWrapper>
              {data?.datasets?.length > 0 ? (
                <Pie data={data} options={options} />
              ) : (
                <p>Loading data...</p>
              )}
            </PieWrapper>
            <div></div>
            <TableWrapper>
              <ColorLabels amount={Object.keys(scores).length} />
              <ScoresTable scores={scores} />
            </TableWrapper>
          </SubContainer>

          {questionId === "do" || questionId === "how" ? (
            <></>
          ) : (
            <div className="total-score">
              Total Score (weighted): {getTotalWeightedScore(scores)}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ActivityAnalysis;
