import { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import ScoresTable from "../scores-table";
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
  const [totalScore, setTotalScore] = useState(-1);

  Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);

        const scores = getScores(survey, questionId);

        setScores(() => scores);

        const getTotal = Object.values(scores).reduce(
          (acc, val) => acc + val,
          0
        );

        setTotalScore(() => getTotal);

        const data = getData(scores);

        setData(() => data);
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
          {totalScore === -1 || totalScore === 0 ? (
            <p className="no-data">No data provided</p>
          ) : (
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
          )}

          {questionId === "do" ||
          questionId === "how" ||
          totalScore === -1 ||
          totalScore === 0 ? (
            <></>
          ) : (
            <div className="total-score">
              {questionId === "well" && "Ability With Prosthesis Total Score: "}
              {questionId === "useful" && "Prosthesis Usefulness Total Score: "}
              {questionId === "without" &&
                "Ability Without Prosthesis Total Score: "}
              {getTotalWeightedScore(scores)}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ActivityAnalysis;
