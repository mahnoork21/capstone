"use client";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";

import styles from "./styled";
import { youngChildActivity } from "../../survey/helper/youngChildActivity";
import {
  questionIds,
  youngChildSurvey,
} from "../../survey/helper/youngChildSurvey";
import { isNullOrUndefined } from "@/utils/utils";

// import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
// import {
//   questionIds,
//   youngChildSurvey,
// } from "../survey/helper/youngChildSurvey";
// import { isNullOrUndefined } from "@/utils/utils";

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

export default SurveyPdf;
