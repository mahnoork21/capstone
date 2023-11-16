import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
  updateDoc,
  query,
  where,
  getDocs,
  Timestamp,
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

  if (!clinicianSnapshot.exists()) throw new Error("Clinician ID is invalid.");

  const clinician = clinicianSnapshot.data();

  if (clinician.clients[clientId])
    throw new Error("This Client Id is already present.");

  const newSurveyRef = doc(collection(clinicianRef, "Survey"));
  await setDoc(newSurveyRef, {
    survey_type: surveyType,
    survey_id: newSurveyRef.id,
    clinician_id: clinicianId,
    client_id: clientId,
    org_id: organizationId,
    created: serverTimestamp(),
    activity_response: {},
  });

  await updateDoc(clinicianRef, {
    [`clients.${clientId}`]: { added: Timestamp.fromDate(new Date()) },
    updated: serverTimestamp(),
  });

  return newSurveyRef.id;
};

export const fetchClients = async (organizationId, clinicianId) => {
  if (!organizationId || !clinicianId)
    throw new Error("Insufficient data provided");

  const clinicianRef = doc(
    db,
    "Organization",
    organizationId,
    "Clinician",
    clinicianId
  );
  const clinicianSnapshot = await getDoc(clinicianRef);

  if (!clinicianSnapshot.exists()) throw new Error("Clinician ID is invalid.");

  const clinician = clinicianSnapshot.data();

  return clinician.clients;
};

export const fetchClientSurveys = async (
  organizationId,
  clinicianId,
  clientId
) => {
  if (!organizationId || !clinicianId || !clientId)
    throw new Error("Insufficient data provided");

  const surveysRef = collection(
    db,
    "Organization",
    organizationId,
    "Clinician",
    clinicianId,
    "Survey"
  );

  let surveys = [];

  const q = query(surveysRef, where("client_id", "==", clientId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    surveys.push(doc.data());
  });

  return surveys;
};

export const addNewSurvey = async (
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

  if (!clinicianSnapshot.exists()) throw new Error("Clinician ID is invalid.");

  const clinician = clinicianSnapshot.data();

  if (!clinician.clients[clientId])
    throw new Error("This Client Id is not present.");

  const newSurveyRef = doc(collection(clinicianRef, "Survey"));
  await setDoc(newSurveyRef, {
    survey_type: surveyType,
    survey_id: newSurveyRef.id,
    clinician_id: clinicianId,
    client_id: clientId,
    org_id: organizationId,
    created: serverTimestamp(),
    activity_response: {},
  });

  return newSurveyRef.id;
};

// if (!clinician.clients.includes(clientId))
//         throw new Error("The provided client id is invalid. Add it first");

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
