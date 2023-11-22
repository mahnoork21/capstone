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
  getCountFromServer,
  orderBy,
  limit,
  startAfter,
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

let lastSurveySnapshot;
export const fetchClientSurveys = async (
  organizationId,
  clinicianId,
  clientId,
  pageNo
) => {
  const queryLimit = 6;

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

  if (pageNo === 0) {
    return [];
  }

  if (pageNo === 1) {
    // Query the first page of docs
    const firstPage = query(
      surveysRef,
      where("client_id", "==", clientId),
      orderBy("created", "desc"),
      limit(queryLimit)
    );
    const documentSnapshots = await getDocs(firstPage);
    documentSnapshots.forEach((doc) => {
      surveys.push(doc.data());
    });

    // Get the last visible document
    lastSurveySnapshot =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return surveys;
  }

  // Construct a new query starting at this document,
  const nextPage = query(
    surveysRef,
    where("client_id", "==", clientId),
    orderBy("created", "desc"),
    startAfter(lastSurveySnapshot),
    // startAfter((pageNo - 1) * queryLimit),
    limit(queryLimit)
  );
  const documentSnapshots = await getDocs(nextPage);
  documentSnapshots.forEach((doc) => {
    surveys.push(doc.data());
  });

  // Get the last visible document
  lastSurveySnapshot =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return surveys;
};

export const getTotalSurveysForClient = async (
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
  const q = query(surveysRef, where("client_id", "==", clientId));

  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
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
