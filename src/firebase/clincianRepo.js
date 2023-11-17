import { db, auth } from "./firebase";
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
} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const signinClinicianByEmail = async (email, password) => {
  try {
    // const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    // console.log("before if-else signInMethods ::", signInMethods);
    // if (signInMethods && signInMethods.length > 0) {
    console.log(
      "Account already exists for this email. Choose another email.",
      email
    );
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    return true;
    // } else {
    //   console.log("account does not exists, CREATE NEW ONE please");
    //   return false;
    // }
  } catch (error) {
    alert(error);
    console.log("Can not signed in: ", error);
  }
};
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
      return userCredential.user.uid;
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
      uid.toString()
    ),
    {
      clinician_id: uid,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      org_id: "oZqnljuEU4b3jZtfHM9v",
      role: data.role,
    }
  );
};

// export const addOrUpdateClinician = async (uid, data) => {
//   console.log("inside addClinicianDb from Repo ===>", data);
//   console.log("where uid is ==>", uid);

//   try {
//     const clinicianRef = db
//       .collection("Organization")
//       .doc("oZqnljuEU4b3jZtfHM9v")
//       .collection("Clinician")
//       .doc(uid);
//     const clinicianDoc = await clinicianRef.get();

//     if (clinicianDoc.exists) {
//       // Update the existing document using setDoc()
//       await setDoc(
//         doc(
//           db,
//           "Organization",
//           "oZqnljuEU4b3jZtfHM9v",
//           "Clinician",
//           "McqFsRlOJab1RxFoTbeXDoYuRZq2"
//         ),
//         {
//           clinician_id: "McqFsRlOJab1RxFoTbeXDoYuRZq2",
//           email: data.email,
//           first_name: data.firstName,
//           last_name: data.lastName,
//           org_id: "oZqnljuEU4b3jZtfHM9v",
//           role: data.role,
//           createdAt: serverTimestamp(),
//         }
//       );
//       console.log("Clinician document updated:", uid);
//     }
// else {
//   const clinicianCollection = collection(
//     db,
//     "Organization",
//     "oZqnljuEU4b3jZtfHM9v",
//     "Clinician"
//   );
//   console.log("data is gonna store for :=>", uid);

//   const new_data = {
//     clinician_id: uid,
//     first_name: data.firstName,
//     last_name: data.lastName,
//     email: data.email,
//     // password: data.password,
//     org_id: data.organization,
//     role: data.role,
//   };
//   console.log("new_data is ", new_data);
//   const docRef = await addDoc(clinicianCollection, { [uid]: data });
// }
//   } catch (error) {
//     console.error("Error adding or updating clinician:", error);
//   }
// };
