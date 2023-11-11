import { db, auth } from "./firebase";
import {
  collectionGroup,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { doc, setDoc } from "firebase/firestore";

// const usersRef = await setDoc(
//   doc(
//     db,
//     "Organization",
//     "oZqnljuEU4b3jZtfHM9v",
//     "clinician",
//     "3vAa4UkWlrT4bdS1L5BfKszHqkl1"
//   ),
//   data
// );

import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

export const createClinicianByEmail = async (email, password) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    if (signInMethods && signInMethods.length > 0) {
      console.log(
        "Account already exists for this email. Choose another email."
      );
      return;
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("New account is created.");
    }
  } catch (error) {
    alert(error);
    console.log("Inside catch block: ", error);
  }
};
export const addClinicianDb = async (uid, data) => {
  // Add a new document in collection
  console.log("inside addClinicianDb from Repo ===>", data);
  console.log("where uid is ==>", uid);
  await setDoc(
    doc(
      db,
      "Organization",
      "oZqnljuEU4b3jZtfHM9v",
      "Clinician",
      "McqFsRlOJab1RxFoTbeXDoYuRZq2"
    ),
    {
      clinician_id: "McqFsRlOJab1RxFoTbeXDoYuRZq2",
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      org_id: "oZqnljuEU4b3jZtfHM9v",
      role: data.role,

      // clinician_id: "McqFsRlOJab1RxFoTbeXDoYuRZq2",
      // email: "sample@gmail.com",
      // first_name: "clini",
      // last_name: "cian",
      // org_id: "oZqnljuEU4b3jZtfHM9v",
      // role: "clinician",
    }
  );
};

export const addOrUpdateClinician = async (uid, data) => {
  try {
    const clinicianRef = db
      .collection(db, "Organization", "oZqnljuEU4b3jZtfHM9v", "Clinician")
      .doc(uid);
    const clinicianDoc = await clinicianRef.get();

    if (clinicianDoc.exists) {
      // Update the existing document using setDoc()
      await clinicianRef.setDoc(doc(clinicianRef, uid), {
        clinician_id: "McqFsRlOJab1RxFoTbeXDoYuRZq2",
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        org_id: "oZqnljuEU4b3jZtfHM9v",
        role: data.role,
      });
      console.log("Clinician document updated:", uid);
    } else {
      // Create a new document using addDoc()
      await db.collection(clinicianRef).add({
        ...data,
        clinician_id: uid, // Assuming you want to store uid in the document
      });
      console.log("New clinician document created:", uid);
    }
  } catch (error) {
    console.error("Error adding or updating clinician:", error);
  }
};

export const getClinicianById = async (clinicianId) => {
  if (!clinicianId) return null;

  const clinicianQuery = query(
    collectionGroup(db, "Clinician"),
    where("clinician_id", "==", clinicianId)
  );
};

export const addClinician = async (data) => {
  usersRef
    .add({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: serverTimestamp(),
      // Add other fields here
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })

    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
