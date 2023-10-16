import { ClientContext } from "@/context/ClientContext";
import MainContainer from "@/shared/components/main-container";
import useSurveyIdCheck from "@/utils/custom-hooks/useSurveyIdCheck";

import { useContext, useEffect, useState } from "react";
import { SurveyCompleteContainer } from "./styled";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PrimaryClientButton from "@/shared/client/buttons/primary";

import { saveAs } from "file-saver";
import {
  pdf,
  PDFViewer,
  StyleSheet,
  Document,
  Page,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import {
  questionIds,
  youngChildSurvey,
} from "../survey/helper/youngChildSurvey";
import { isNullOrUndefined } from "@/utils/utils";

const SurveyComplete = () => {
  const { setIsNavBarVisible, activityResponses, currentSurveyId } =
    useContext(ClientContext);
  const [surveyBlob, setSurveyBlob] = useState(null);

  useEffect(() => {
    setIsNavBarVisible(false);

    return () => {
      setIsNavBarVisible(true);
    };
  });

  // if (!activityResponses) {
  //   return;
  // }

  Font.register({
    family: "Open Sans",
    src: `https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,500&family=Roboto:wght@400;500;700&display=swap`,
  });

  const SurveyPdf = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.logo}>PUFI2 - Survey Summary</Text>
        </View>
        <View style={styles.activityWrapper}>
          {youngChildActivity.map((activity, index) => {
            return (
              <View style={styles.activity}>
                <Text style={styles.activityTitle}>
                  {index + 1}. {activity.label}
                </Text>

                {questionIds.map((questionId, questionIndex) => {
                  const activityRespose = activityResponses[activity.id];
                  const questionRespose = activityRespose[questionId];

                  const option = youngChildSurvey[questionIndex].options.find(
                    (option) => {
                      return option.value === questionRespose.value;
                    }
                  );

                  return (
                    <>
                      <View style={styles.questionWrapper}>
                        <Text style={styles.question}>
                          Q. {youngChildSurvey[questionIndex].label}
                        </Text>
                      </View>
                      <View style={styles.answerWrapper}>
                        <Text>A. </Text>

                        <View>
                          {!isNullOrUndefined(questionRespose.value) ? (
                            <>
                              <Text>{option?.label}</Text>
                              <Text>
                                {questionId === "how" &&
                                questionRespose.value === 3
                                  ? questionRespose.bodypart
                                  : ""}
                              </Text>
                              <Text>
                                {questionId === "how" &&
                                questionRespose.value === 0
                                  ? questionRespose.commentForNotSure
                                  : ""}
                              </Text>
                              <Text>{questionRespose.comment}</Text>
                            </>
                          ) : (
                            "N/A"
                          )}
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );

  const createPDFBlob = async () => {
    const surveyPdfBlob = await pdf(<SurveyPdf />).toBlob();
    setSurveyBlob(surveyPdfBlob);
  };

  useEffect(() => {
    if (activityResponses) {
      createPDFBlob();
    }
  }, [activityResponses]);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 12,
    },
    section: {
      backgroundColor: "#3a9034",
      height: 50,
      padding: 10,
      width: "100%",
      justifyContent: "center",
    },
    logo: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    activityWrapper: {
      flexDirection: "column",
      gap: "16px",
      justifyContent: "center",
    },
    activity: {
      width: "80%",
      padding: "8px",
    },
    activityTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    answerWrapper: {
      flexDirection: "row",
    },
    questionWrapper: {
      flexDirection: "row",
    },
    question: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <MainContainer>
      <SurveyCompleteContainer>
        <CheckCircleOutlineIcon />
        <p>Thank you for completing the survey.</p>
        <p>
          Your response is private and confidential. It will be used by
          clinicians to improve prosthesis use in children.
        </p>
        <PrimaryClientButton
          onClick={() => {
            saveAs(surveyBlob, `${currentSurveyId}.pdf`);
          }}
        >
          Download Survey
        </PrimaryClientButton>
      </SurveyCompleteContainer>
      {/* <PDFViewer>
        <SurveyPdf />
      </PDFViewer> */}
    </MainContainer>
  );
};

export default SurveyComplete;
