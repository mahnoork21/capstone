import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  collectionGroup,
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
    is_archived: false,
    activity_response: {},
    is_submitted: false,
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
    is_archived: false,
    activity_response: {},
    is_submitted: false,
  });

  return newSurveyRef.id;
};

export const fetchAllClinicianSurveys = async (
  organizationId,
  clinicianId,
  isArchived
) => {
  if (!organizationId || !clinicianId)
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

  const q = query(surveysRef, where("is_archived", "==", isArchived));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    surveys.push(doc.data());
  });

  return surveys;
};

export const fetchFilteredClinicianSurveys = async (
  organizationId,
  clinicianId,
  { clientId, surveyType, surveyStatus, fromDate, toDate },
  isArchived
) => {
  if (!organizationId || !clinicianId) {
    throw new Error("Insufficient data provided");
  }

  const surveysRef = collection(
    db,
    "Organization",
    organizationId,
    "Clinician",
    clinicianId,
    "Survey"
  );

  let surveys = [];

  // Build the query based on the filter parameters
  let q = query(surveysRef);

  if (isArchived !== null && isArchived !== undefined) {
    q = query(q, where("is_archived", "==", isArchived));
  }

  if (clientId !== "") {
    q = query(q, where("client_id", "==", clientId));
  }

  // Check if all values in surveyType are false
  const isAllSurveyTypesFalse = Object.values(surveyType).every(
    (value) => !value
  );

  if (!isAllSurveyTypesFalse) {
    const selectedSurveyTypes = Object.entries(surveyType)
      .filter(([_, isSelected]) => isSelected)
      .map(([type, _]) => type);

    q = query(q, where("survey_type", "in", selectedSurveyTypes));
  }

  // Apply date range conditions
  if (fromDate && toDate) {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    console.log("fromDateObj -> ", fromDateObj);

    if (fromDateObj && toDateObj) {
      q = query(
        q,
        where("created", ">=", fromDateObj),
        where("created", "<=", toDateObj)
      );
    } else {
      console.error("Invalid date format for fromDate or toDate");
    }
  } else if (fromDate) {
    q = query(q, where("created", ">=", new Date(fromDate)));
  } else if (toDate) {
    q = query(q, where("created", "<=", new Date(toDate)));
  }

  const querySnapshot = await getDocs(q);

  const isAllSurveyStatusFalse = Object.values(surveyStatus).every(
    (value) => !value
  );

  querySnapshot.forEach((doc) => {
    if (!isAllSurveyStatusFalse) {
      const { is_submitted, updated } = doc.data();
      const survey_status = is_submitted
        ? "Complete"
        : updated
        ? "In-progress"
        : "Pending";

      if (surveyStatus[survey_status]) {
        surveys.push({ ...doc.data(), surveyStatus });
      }
    } else {
      surveys.push(doc.data());
    }
  });

  return surveys;
};

export const fetchClinicianSurveysByStatus = async (
  organizationId,
  clinicianId,
  surveyStatus
) => {
  if (!organizationId || !clinicianId || !surveyStatus) {
    throw new Error("Insufficient data provided");
  }

  const surveysRef = collection(
    db,
    "Organization",
    organizationId,
    "Clinician",
    clinicianId,
    "Survey"
  );

  let surveys = [];

  // Build the query based on the filter parameters
  let q = query(surveysRef, orderBy("created", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const { is_submitted, updated } = doc.data();
    const survey_status = is_submitted
      ? "Complete"
      : updated
      ? "In-progress"
      : "Pending";

    if (surveyStatus == survey_status) {
      surveys.push({ ...doc.data(), surveyStatus });
    }
  });

  return surveys;
};

export const fetchClinicianSurveyById = async (
  organizationId,
  clinicianId,
  clientId,
  surveyId
) => {
  if (!organizationId || !clinicianId || !surveyId)
    throw new Error("Insufficient data provided");
  const surveyRef = collection(
    db,
    "Organization",
    organizationId,
    "Clinician",
    clinicianId,
    "Survey"
  );

  // Build the query based on the filter parameters
  let q = query(surveyRef);

  if (clientId !== "") {
    q = query(q, where("client_id", "==", clientId));
  }

  const surveyQuery = query(q, where("survey_id", "==", surveyId));

  const surveySnapshot = await getDocs(surveyQuery);

  if (!surveySnapshot.size) return null;
  console.log(
    "surveySnapshot.docs[0].data() -> ",
    surveySnapshot.docs[0].data()
  );
  return surveySnapshot.docs[0].data();
};

export const archiveRestoreSurveyById = async (surveyId) => {
  if (!surveyId) throw new Error("Insufficient data provided");

  try {
    const surveyQuery = query(
      collectionGroup(db, "Survey"),
      where("survey_id", "==", surveyId)
    );
    const surveySnapshot = await getDocs(surveyQuery);

    if (surveySnapshot.size === 0) {
      throw new Error("Survey not found");
    }

    const surveyDocRef = surveySnapshot.docs[0].ref;

    const currentIsArchived = surveySnapshot.docs[0].data().is_archived;

    // Update the "is_archived" field to the opposite value
    await updateDoc(surveyDocRef, {
      is_archived: !currentIsArchived,
    });

    return true;
  } catch (error) {
    console.error("Error archiving/restoring survey:", error);
    return false;
  }
};

export const doesClinicianHaveSurveys = async (organizationId, clinicianId) => {
  try {
    if (!organizationId || !clinicianId) {
      throw new Error("Insufficient data provided");
    }

    const surveysRef = query(
      collection(
        db,
        "Organization",
        organizationId,
        "Clinician",
        clinicianId,
        "Survey"
      )
    );

    const querySnapshot = await getDocs(surveysRef);

    return querySnapshot.size > 0;
  } catch (error) {
    console.error("Error checking if clinician has surveys:", error);
    return false;
  }
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
