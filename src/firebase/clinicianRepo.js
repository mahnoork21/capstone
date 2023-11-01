import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const addNewClient = async (
  organizationId,
  clinicianId,
  clientId,
  surveyType
) => {
  if (!organizationId || !clinicianId || !clientId || !surveyType)
    throw new Error("Insufficient data provided");

  const clinicianRef = doc(
    db,
    "Organization",
    organizationId,
    "Clinician",
    clinicianId
  );
  const clinicianSnapshot = await getDoc(clinicianRef);

  if (clinicianSnapshot.exists()) {
    const clinician = clinicianSnapshot.data();
    if (clinician.clients.find((id) => id == clientId))
      throw new Error("This Client Id is already present.");

    const newSurveyRef = doc(collection(clinicianRef, "Survey"));
    await setDoc(newSurveyRef, {
      survey_type: surveyType,
      survey_id: newSurveyRef.id,
      clinician_id: clinicianId,
      client_id: clientId,
      org_id: organizationId,
      created: serverTimestamp(),
    });

    await updateDoc(clinicianRef, {
      clients: arrayUnion(clientId),
      updated: serverTimestamp(),
    });

    return newSurveyRef.id;
  } else {
    throw new Error("Clinician ID is invalid.");
  }
};

// let currentSurveyPath;

// export const getSurveyById = async (organizationId, clinicianId, surveyId) => {
//   if (!surveyId) return null;

//   const surveyRef = doc(
//     db,
//     "Organization",
//     organizationId,
//     "Clinician",
//     clinicianId,
//     "Survey",
//     surveyId
//   );
//   const surveySnapshot = await getDoc(surveyRef);

//   if (surveySnapshot.exists()) {
//     currentSurveyPath = surveySnapshot.ref.path;
//     return surveySnapshot.data();
//   } else {
//     return null;
//   }
// };

// export const updateAnswerInSurvey = async (activityId, currentAnswer) => {
//   const surveyRef = doc(db, currentSurveyPath);
//   await updateDoc(surveyRef, {
//     [`activity_response.${activityId}`]: currentAnswer,
//     updated: serverTimestamp(),
//   });
// };

// export const updateCommentAndCompleteSurvey = async (comment) => {
//   const surveyRef = doc(db, currentSurveyPath);
//   await updateDoc(surveyRef, {
//     final_comment: comment,
//     is_submitted: true,
//     updated: serverTimestamp(),
//     submitted: serverTimestamp(),
//   });
// };
