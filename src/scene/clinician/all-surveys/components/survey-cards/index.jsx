import { SurveyCardsBox } from "@/scene/clinician/my-clients/components/surveysPerClient/styled";
import ClientSurveyCard from "@/shared/clinician/clientSurveyCard";

import React from "react";

const SurveyCards = ({ surveysListData, surveysPageNo }) => {
  const noOfItemsOnOnePage = 6;

  return (
    <SurveyCardsBox>
      {surveysListData
        .slice(
          noOfItemsOnOnePage * (surveysPageNo - 1),
          noOfItemsOnOnePage * surveysPageNo
        )
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
            />
          )
        )}
    </SurveyCardsBox>
  );
};

export default SurveyCards;
