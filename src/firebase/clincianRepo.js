import { db } from "./firebase";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export const getClinicianById = async (clinicianId) => {
  if (!clinicianId) return null;

  const clinicianQuery = query(
    collectionGroup(db, "Clinician"),
    where("clinician_id", "==", clinicianId)
  );
};
