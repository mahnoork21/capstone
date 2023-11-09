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
  //     console.log("new account is created");
  //     const userCredential = createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //   }
  // } catch (error) {
  //   alert(error);
  //   console.log("inside catch block");
  // }
  // const userCredential = createUserWithEmailAndPassword(auth, email, password);
  //.then((userCredential) => {
  // Signed up

  //   const user = userCredential.user;
  //   console.log(user);
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });
};
export const addClinicianDb = async (uid, data) => {};
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
