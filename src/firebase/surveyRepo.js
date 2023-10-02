import { db } from "./firebase";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

let currentSurveyPath;

export const getSurveyById = async (surveyId) => {
  const surveyQuery = query(
    collectionGroup(db, "Survey"),
    where("survey_id", "==", surveyId)
  );
  const surveySnapshot = await getDocs(surveyQuery);
  currentSurveyPath = surveySnapshot.docs[0].ref.path;
  return surveySnapshot.size ? surveySnapshot.docs[0].data() : null;
};

export const updateAnswerInSurvey = async (activityId, currentAnswer) => {
  console.log("### current ser ", currentSurveyPath);
  const surveyRef = doc(db, currentSurveyPath);
  await updateDoc(surveyRef, {
    [`activity_response.${activityId}`]: currentAnswer,
  });
};
