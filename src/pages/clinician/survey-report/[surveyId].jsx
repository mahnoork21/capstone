import React from "react";

import SurveyReport from "@/scene/clinician/survey-report";
import { useRouter } from "next/router";

const SurveyReportPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  return <SurveyReport surveyId={surveyId} />;
};

export default SurveyReportPage;
