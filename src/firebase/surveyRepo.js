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
  //TODO message: survey id not found
  if (!surveyId) return null;

  const surveyQuery = query(
    collectionGroup(db, "Survey"),
    where("survey_id", "==", surveyId)
  );
  const surveySnapshot = await getDocs(surveyQuery);

  //TODO survey not found in db
  if (!surveySnapshot.size) return null;
  currentSurveyPath = surveySnapshot.docs[0].ref.path;
  return surveySnapshot.docs[0].data();
};

export const updateAnswerInSurvey = async (activityId, currentAnswer) => {
  const surveyRef = doc(db, currentSurveyPath);
  await updateDoc(surveyRef, {
    [`activity_response.${activityId}`]: currentAnswer,
  });
};
