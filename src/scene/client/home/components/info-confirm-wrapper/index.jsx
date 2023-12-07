import { StyledMessageToUser, SurveyIdInfoWarpper } from "./styled";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";

const InfoConfirmWrapper = () => {
  const { survey } = useContext(ClientContext);

  return (
    <>
      {survey ? (
        <>
          <SurveyIdInfoWarpper>
            <p>Client ID:</p>
            <p>{survey.client_id ?? "N/A"}</p>
            <p>Survey ID:</p>
            <p>{survey.survey_id ?? "N/A"}</p>
            <p>Survey Type:</p>
            <p>{survey.survey_type ?? "N/A"}</p>
          </SurveyIdInfoWarpper>

          <StyledMessageToUser
            message={
              "Please confirm questionnaire info before starting the questionnaire."
            }
          />
        </>
      ) : (
        <StyledMessageToUser
          message={
            "Questionnaire link is not valid. Please contact your clinician for a link to the questionnaire."
          }
          type="error"
        />
      )}
    </>
  );
};

export default InfoConfirmWrapper;
