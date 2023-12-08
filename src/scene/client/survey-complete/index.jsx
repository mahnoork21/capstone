import { ClientContext } from "@/context/ClientContext";
import MainContainer from "@/shared/components/main-container";

import { useContext, useEffect, useState } from "react";
import { SurveyCompleteContainer } from "./styled";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PrimaryClientButton from "@/shared/client/buttons/primary";

import { saveAs } from "file-saver";
import {
  pdf,
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
  const { setIsNavBarVisible, activityResponses, surveyId, survey } =
    useContext(ClientContext);
  const [surveyBlob, setSurveyBlob] = useState(null);

  useEffect(() => {
    setIsNavBarVisible(false);

    return () => {
      setIsNavBarVisible(true);
    };
  });

  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src: `https://fonts.googleapis.com/css2?family=Open+Sans&display=swap`,
      },
      {
        src: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap`,
        fontWeight: 700,
      },
    ],
  });

  const SurveyPdf = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.logo}>PUFI2 - Questionnaire Summary</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.infoWrapperText}>
            Questionnaire Id: {surveyId}
          </Text>
          <Text style={styles.infoWrapperText}>
            Questionnaire Type: {survey.survey_type}
          </Text>
          <Text style={styles.infoWrapperText}>
            Completion Date:{" "}
            {new Date(survey.submitted.seconds * 1000).toDateString()}
          </Text>
        </View>
        <View style={styles.activityWrapper}>
          {youngChildActivity.map((activity, index) => {
            return (
              <View key={activity.id} style={styles.activity}>
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
                              {questionId === "how" &&
                              questionRespose.value === 3 ? (
                                <Text>{questionRespose.bodypart}</Text>
                              ) : (
                                ""
                              )}
                              {questionId === "how" &&
                              questionRespose.value === 0 ? (
                                <Text>{questionRespose.commentForNotSure}</Text>
                              ) : (
                                ""
                              )}
                              {questionRespose.comment && (
                                <Text>{questionRespose.comment}</Text>
                              )}
                            </>
                          ) : (
                            <Text>N/A</Text>
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
        <Text style={styles.finalComment}>
          Final Comment: {survey.final_comment || "N/A"}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
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
      paddingBottom: 65,
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
      marginTop: 10,
    },
    activity: {
      width: "80%",
      padding: "8px",
      fontSize: 14,
    },
    activityTitle: {
      fontSize: 16,
      fontWeight: 700,
    },
    answerWrapper: {
      flexDirection: "row",
      marginTop: 2,
    },
    questionWrapper: {
      flexDirection: "row",
    },
    question: {
      fontSize: 14,
      fontWeight: 700,
      marginTop: 8,
    },
    finalComment: {
      fontSize: 16,
      marginTop: 10,
    },
    infoWrapper: {
      marginTop: 6,
    },
    infoWrapperText: {
      marginTop: 4,
      fontSize: 14,
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

  return (
    <MainContainer>
      <SurveyCompleteContainer>
        <CheckCircleOutlineIcon />
        <p>Thank you for completing the PUFI-2.</p>
        <p>
          Your response is private and confidential. It will be used by
          clinicians to improve prosthesis use in children.
        </p>
        <PrimaryClientButton
          onClick={() => {
            saveAs(surveyBlob, `${surveyId}.pdf`);
          }}
        >
          Download PUFI-2
        </PrimaryClientButton>
      </SurveyCompleteContainer>
    </MainContainer>
  );
};

export default SurveyComplete;
