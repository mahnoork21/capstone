import ClientSurveyCard from "@/shared/clinician/clientSurveyCard";

import React from "react";
import { SurveyCardsBox } from "./styled";

const SurveyCards = ({ surveysListData }) => {
  return (
    <SurveyCardsBox>
      {surveysListData
        .slice(0, 4)
        .map(
          ({
            survey_id,
            survey_type,
            client_id,
            clinician_id,
            org_id,
            created,
            updated,
            submitted,
            is_submitted,
            activity_response,
            is_archived,
          }) => (
            <ClientSurveyCard
              key={survey_id}
              surveyId={survey_id}
              surveyType={survey_type}
              clientId={client_id}
              clinicianId={clinician_id}
              orgId={org_id}
              createdDate={created}
              updatedDate={updated}
              submittedDate={submitted}
              isSubmitted={is_submitted}
              activityResponse={activity_response}
              isArchived={is_archived}
            />
          )
        )}
    </SurveyCardsBox>
  );
};

export default SurveyCards;
