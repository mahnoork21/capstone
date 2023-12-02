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
    status: 0,
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
    status: 0,
  });

  return newSurveyRef.id;
};

let allClinicianActiveSnapshots = [];
let allClinicianArchivedSnapshots = [];
export const fetchAllClinicianSurveys = async (
  organizationId,
  clinicianId,
  isArchived,
  pageNo
) => {
  const queryLimit = 9;
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

  if (pageNo === 0) {
    return [];
  }

  let q = query(surveysRef, where("is_archived", "==", isArchived));

  if (pageNo === 1) {
    // Query the first page of docs
    const firstPage = query(q, orderBy("created", "desc"), limit(queryLimit));
    const documentSnapshots = await getDocs(firstPage);
    documentSnapshots.forEach((doc) => {
      surveys.push(doc.data());
    });

    // Get the last visible document
    if (isArchived) {
      const lastAllClinicianArchivedSnapshot =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      allClinicianArchivedSnapshots = [lastAllClinicianArchivedSnapshot];
    } else {
      const lastAllClinicianActiveSnapshot =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      allClinicianActiveSnapshots = [lastAllClinicianActiveSnapshot];
    }

    return surveys;
  }

  // Construct a new query starting at this document,
  let nextPage;
  if (isArchived) {
    nextPage = query(
      q,
      orderBy("created", "desc"),
      startAfter(allClinicianArchivedSnapshots[pageNo - 2]),
      limit(queryLimit)
    );
  } else {
    nextPage = query(
      q,
      orderBy("created", "desc"),
      startAfter(allClinicianActiveSnapshots[pageNo - 2]),
      limit(queryLimit)
    );
  }

  const documentSnapshots = await getDocs(nextPage);
  documentSnapshots.forEach((doc) => {
    surveys.push(doc.data());
  });

  // Get the last visible document
  if (isArchived) {
    const lastAllClinicianArchivedSnapshot =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // When archiving on previous page, replace snapshots of next pages
    allClinicianArchivedSnapshots.splice(
      pageNo - 1,
      Infinity,
      lastAllClinicianArchivedSnapshot
    );
  } else {
    const lastAllClinicianActiveSnapshot =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // When archiving on previous page, replace snapshots of next pages
    allClinicianActiveSnapshots.splice(
      pageNo - 1,
      Infinity,
      lastAllClinicianActiveSnapshot
    );
  }

  return surveys;
};

//TODO: fetch only first 4
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

  let status =
    surveyStatus === "Complete" ? 2 : surveyStatus === "In-progress" ? 1 : 0;

  // Build the query based on the filter parameters
  let q = query(
    surveysRef,
    where("is_archived", "==", false),
    where("status", "==", status),
    orderBy("created", "desc"),
    limit(4)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    surveys.push(doc.data());
  });

  return surveys;
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

let clientSurveySnapshots = [];
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
      where("is_archived", "==", false),
      orderBy("created", "desc"),
      limit(queryLimit)
    );
    const documentSnapshots = await getDocs(firstPage);
    documentSnapshots.forEach((doc) => {
      surveys.push(doc.data());
    });

    // Get the last visible document
    const lastSurveySnapshot =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    clientSurveySnapshots = [lastSurveySnapshot];

    return surveys;
  }

  // Construct a new query starting at this document,
  const nextPage = query(
    surveysRef,
    where("client_id", "==", clientId),
    where("is_archived", "==", false),
    orderBy("created", "desc"),
    startAfter(clientSurveySnapshots[pageNo - 2]),
    limit(queryLimit)
  );
  const documentSnapshots = await getDocs(nextPage);
  documentSnapshots.forEach((doc) => {
    surveys.push(doc.data());
  });

  // Get the last visible document
  const lastSurveySnapshot =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];

  // When archiving on previous page, replace snapshots of next pages
  clientSurveySnapshots.splice(pageNo - 1, Infinity, lastSurveySnapshot);

  return surveys;
};

let filterActiveSurveySnapshots = [];
let filterArchivedSurveySnapshots = [];
export const fetchFilteredClinicianSurveys = async (
  organizationId,
  clinicianId,
  { clientId, surveyType, surveyStatus, fromDate, toDate },
  isArchived,
  pageNo,
  queryLimit
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
  } else {
    q = query(q, where("is_archived", "==", false));
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
      .filter(([, isSelected]) => isSelected)
      .map(([type]) => type);

    q = query(q, where("survey_type", "in", selectedSurveyTypes));
  }

  // Apply date range conditions
  if (fromDate && toDate) {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

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

  const isAllSurveyStatusFalse = Object.values(surveyStatus).every(
    (value) => !value
  );

  if (!isAllSurveyStatusFalse) {
    const selectedStatuses = Object.entries(surveyStatus)
      .filter(([, isSelected]) => isSelected)
      .map(([status]) =>
        status === "Complete" ? 2 : status === "In-progress" ? 1 : 0
      );

    q = query(q, where("status", "in", selectedStatuses));
  }

  if (pageNo === 0) {
    return [];
  }

  if (pageNo === 1) {
    // Query the first page of docs
    const firstPage = query(q, orderBy("created", "desc"), limit(queryLimit));
    const documentSnapshots = await getDocs(firstPage);
    documentSnapshots.forEach((doc) => {
      surveys.push(doc.data());
    });

    if (isArchived) {
      // Get the last visible document
      const lastFilterArchivedSurveySnapshot =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      filterArchivedSurveySnapshots = [lastFilterArchivedSurveySnapshot];
    } else {
      // Get the last visible document
      const lastFilterActiveSurveySnapshot =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      filterActiveSurveySnapshots = [lastFilterActiveSurveySnapshot];
    }

    return surveys;
  }

  // Construct a new query starting at this document,
  let nextPage;
  if (isArchived) {
    nextPage = query(
      q,
      orderBy("created", "desc"),
      startAfter(filterArchivedSurveySnapshots[pageNo - 2]),
      limit(queryLimit)
    );
  } else {
    nextPage = query(
      q,
      orderBy("created", "desc"),
      startAfter(filterActiveSurveySnapshots[pageNo - 2]),
      limit(queryLimit)
    );
  }

  const documentSnapshots = await getDocs(nextPage);
  documentSnapshots.forEach((doc) => {
    surveys.push(doc.data());
  });

  if (isArchived) {
    // Get the last visible document
    const lastFilterArchivedSurveySnapshot =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // When archiving on previous page, replace snapshots of next pages
    filterArchivedSurveySnapshots.splice(
      pageNo - 1,
      Infinity,
      lastFilterArchivedSurveySnapshot
    );
  } else {
    // Get the last visible document
    const lastFilterActiveSurveySnapshot =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // When archiving on previous page, replace snapshots of next pages
    filterActiveSurveySnapshots.splice(
      pageNo - 1,
      Infinity,
      lastFilterActiveSurveySnapshot
    );
  }

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
  const q = query(
    surveysRef,
    where("client_id", "==", clientId),
    where("is_archived", "==", false)
  );

  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
};

export const getTotalAllClinicianSurveys = async (
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

  const q = query(surveysRef, where("is_archived", "==", isArchived));

  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
};

export const getTotalFilteredSurveysForClient = async (
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

  let q = query(surveysRef);

  if (isArchived !== null && isArchived !== undefined) {
    q = query(q, where("is_archived", "==", isArchived));
  } else {
    q = query(q, where("is_archived", "==", false));
  }

  if (clientId !== "") {
    q = query(q, where("client_id", "==", clientId));
  }

  const isAllSurveyTypesFalse = Object.values(surveyType).every(
    (value) => !value
  );

  if (!isAllSurveyTypesFalse) {
    const selectedSurveyTypes = Object.entries(surveyType)
      .filter(([, isSelected]) => isSelected)
      .map(([type]) => type);

    q = query(q, where("survey_type", "in", selectedSurveyTypes));
  }

  if (fromDate && toDate) {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

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

  const isAllSurveyStatusFalse = Object.values(surveyStatus).every(
    (value) => !value
  );
  if (!isAllSurveyStatusFalse) {
    const selectedStatuses = Object.entries(surveyStatus)
      .filter(([, isSelected]) => isSelected)
      .map(([status]) =>
        status === "Complete" ? 2 : status === "In-progress" ? 1 : 0
      );

    q = query(q, where("status", "in", selectedStatuses));
  }

  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
};

export const getTotalClinicianSurveysByStatus = async (
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

  let status =
    surveyStatus === "Complete" ? 2 : surveyStatus === "In-progress" ? 1 : 0;

  // Build the query based on the filter parameters
  let q = query(
    surveysRef,
    where("is_archived", "==", false),
    where("status", "==", status),
    orderBy("created", "desc")
  );

  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
};
