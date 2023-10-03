import { auth } from "@/firebase/firebase";
import {
  addSurveyToUserIdInLocalStorage,
  addUserToLocalStorage,
  checkAndAddSurveyToUserIdInLocalStorage,
  isSurveyIdInLocalStorage,
  isUserIdInLocalStorage,
} from "@/utils/localStorageUtils";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

const { createContext, useEffect, useState, useRef } = require("react");

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  //TODO check the status of this survey in the database
  //if complete, disable the start survey button, display message

  //TODO read the stored user and surveyId from params
  const currentSurveyId = "qDzH1cFYVwLzJQ9Gn8En";
  const [user, setUser] = useState(null);
  const [breakpoint, setBreakpoint] = useState(`desktop`);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    signInAnonymously(auth).then(() => {
      console.log("Signed In anonymously");
    });

    const mediaQuery = window.matchMedia("screen and (min-width: 1024px)");
    const changeListener = (e) => {
      if (e.matches) {
        setBreakpoint(`desktop`);
      } else {
        setBreakpoint(`mobile`);
      }
    };
    changeListener(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", changeListener);
      return () => {
        unsubscribe();
        mediaQuery.removeEventListener("change", changeListener);
      };
    } else {
      //for backward compatibility with older safari broswers
      mediaQuery.addListener(changeListener);
      return () => {
        unsubscribe();
        mediaQuery.removeListener(changeListener);
      };
    }
  }, []);

  console.log(" ****** Current Breakpoint == ", breakpoint);

  return (
    <ClientContext.Provider value={{ currentSurveyId, user, breakpoint }}>
      {children}
    </ClientContext.Provider>
  );
};
