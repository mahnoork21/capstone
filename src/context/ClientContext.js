import { auth } from "@/firebase/firebase";
import {
  addSurveyToUserIdInLocalStorage,
  addUserToLocalStorage,
  checkAndAddSurveyToUserIdInLocalStorage,
  isSurveyIdInLocalStorage,
  isUserIdInLocalStorage,
} from "@/utils/localStorageUtils";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

const { createContext, useEffect, useState } = require("react");

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  //TODO check the status of this survey in the database
  //if complete, disable the start survey button, display message

  //TODO read the stored user and surveyId from params
  const currentSurveyId = "qDzH1cFYVwLzJQ9Gn8En";
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });

  useEffect(() => {
    signInAnonymously(auth).then(() => {
      console.log("Signed In anonymously");
    });
  }, []);

  return (
    <ClientContext.Provider value={{ currentSurveyId, user }}>
      {children}
    </ClientContext.Provider>
  );
};
