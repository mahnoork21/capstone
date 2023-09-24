import {
  addSurveyToUserIdInLocalStorage,
  addUserToLocalStorage,
  checkAndAddSurveyToUserIdInLocalStorage,
  isSurveyIdInLocalStorage,
  isUserIdInLocalStorage,
} from "@/utils/localStorageUtils";

const { createContext, useEffect } = require("react");

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  //TODO check the status of this survey in the database
  //if complete, disable the start survey button, display message

  //TODO read the stored user and surveyId from params
  const currentUserId = "12345";
  const currentSurveyId = "650f21d9b62380b34bd10981";

  useEffect(() => {
    if (!isUserIdInLocalStorage(currentUserId)) {
      addUserToLocalStorage(currentUserId);
    }

    checkAndAddSurveyToUserIdInLocalStorage(currentUserId, currentSurveyId);
  }, [currentUserId, currentSurveyId]);

  return (
    <ClientContext.Provider value={{ currentUserId, currentSurveyId }}>
      {children}
    </ClientContext.Provider>
  );
};
