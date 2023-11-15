import { app, db, auth, getFirestore } from "./firebase";
import {
  addDoc,
  collection,
  collectionGroup,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  doc,
  setDoc,
} from "firebase/firestore";

console.log("db:", db);
const firestore = getFirestore(db);
console.log("Firestore instance:", firestore);

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
  console.log("inside addClinicianDb from Repo ===>", data);
  console.log("where uid is ==>", uid);

  try {
    // const clinicianRef = db
    //   .collection("Organization")
    //   .doc("oZqnljuEU4b3jZtfHM9v")
    //   .collection("Clinician")
    //   .doc(uid);
    // const clinicianDoc = await clinicianRef.get();

    const clinicianRef = collection(
      firestore,
      "Organization",
      "oZqnljuEU4b3jZtfHM9v",
      "Clinician"
    );
    const clinicianDoc = doc(clinicianRef, uid);
    // const clinicianDoc = await getDoc(clinicianRef);

    if (clinicianDoc.exists) {
      // Update the existing document using setDoc()
      await setDoc(
        doc(db, "Organization", "oZqnljuEU4b3jZtfHM9v", "Clinician", uid),
        {
          clinician_id: uid,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          org_id: "oZqnljuEU4b3jZtfHM9v",
          role: data.role,
          createdAt: serverTimestamp(),
        }
      );
      console.log("Clinician document updated:", uid);
    } else {
      // const clinicianRef = db
      //   .collection("Organization")
      //   .doc("oZqnljuEU4b3jZtfHM9v")
      //   .collection("Clinician");

      // const clinicianCollection = await clinicianRef.get();

      const clinicianRef = collection(
        firestore,
        "Organization",
        "oZqnljuEU4b3jZtfHM9v",
        "Clinician"
      );

      const clinicianCollection = doc(clinicianRef, uid);

      console.log("data is gonna store for :=>", uid);

      const new_data = {
        clinician_id: uid,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        org_id: data.organization,
        role: data.role,
      };
      console.log("new_data is ", new_data);
      const docRef = await addDoc(clinicianCollection, { [uid]: new_data });
    }
  } catch (error) {
    console.error("Error adding or updating clinician:", error);
  }
};

// export const getClinicianById = async (clinicianId) => {
//   if (!clinicianId) return null;

//   const clinicianQuery = query(
//     collectionGroup(db, "Clinician"),
//     where("clinician_id", "==", clinicianId)
//   );
// };

// export const addClinician = async (data) => {
//   usersRef
//     .add({
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       password: data.password,
//       role: data.role,
//       createdAt: serverTimestamp(),
//       // Add other fields here
//     })
//     .then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//     })

//     .catch((error) => {
//       console.error("Error adding document: ", error);
//     });
// };
