import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

let currentSurveyPath;

export const getSurveyById = async (organizationId, clinicianId, surveyId) => {
  if (!surveyId) return null;

  const surveyRef = doc(
    db,
    "Organization",
    organizationId,
    "Clinician",
    clinicianId,
    "Survey",
    surveyId
  );
  const surveySnapshot = await getDoc(surveyRef);

  if (surveySnapshot.exists()) {
    currentSurveyPath = surveySnapshot.ref.path;
    return surveySnapshot.data();
  } else {
    return null;
  }
};

export const updateAnswerInSurvey = async (activityId, currentAnswer) => {
  const surveyRef = doc(db, currentSurveyPath);
  await updateDoc(surveyRef, {
    [`activity_response.${activityId}`]: currentAnswer,
    updated: serverTimestamp(),
    status: 1,
  });
};

export const updateCommentAndCompleteSurvey = async (comment) => {
  const surveyRef = doc(db, currentSurveyPath);
  await updateDoc(surveyRef, {
    final_comment: comment,
    is_submitted: true,
    updated: serverTimestamp(),
    submitted: serverTimestamp(),
    status: 2,
  });
};
