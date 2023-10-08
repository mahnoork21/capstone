import { auth } from "@/firebase/firebase";
import { getSurveyById } from "@/firebase/surveyRepo";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useRouter } from "next/router";

const { createContext, useEffect, useState, useCallback } = require("react");

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [currentSurveyId, setCurrentSurveyId] = useState(null);
  const [user, setUser] = useState(null);
  const [breakpoint, setBreakpoint] = useState(`desktop`);
  const [survey, setSurvey] = useState();
  const [headerButtonType, setHeaderButtonType] = useState(
    HeaderButtonType.START_SURVEY
  );

  const router = useRouter();

  const getCurrentSurvey = async () => {
    const survey = await getSurveyById(currentSurveyId);
    if (survey) {
      setSurvey(survey);
    } else {
    }
  };

  const handleStartSurveyClick = useCallback(() => {
    if (survey) {
      if (!survey.is_submitted) {
        router.push("/client/survey");
      } else {
        //TODO route to already complete screen
        console.log(" ## Survey Is submitted ##");
        router.push("/client");
      }
    } else {
      //TODO show error message that error not found in homepage
      console.log(" ## Survey Not found ##");
      router.push("/client");
    }
  }, []);

  useEffect(() => {
    if (user && currentSurveyId) {
      getCurrentSurvey();
    }
  }, [currentSurveyId, user]);

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

  console.log("[Debug] SurveyId == ", currentSurveyId);
  console.log("[Debug] Survey == ", survey);

  return (
    <ClientContext.Provider
      value={{
        currentSurveyId,
        activityResponses: survey?.activity_response,
        setSurvey,
        breakpoint,
        headerButtonType,
        setHeaderButtonType: setHeaderButtonType,
        setCurrentSurveyId: setCurrentSurveyId,
        handleStartSurveyClick: handleStartSurveyClick,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
