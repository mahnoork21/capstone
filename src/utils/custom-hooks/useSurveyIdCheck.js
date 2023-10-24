import { ClientContext } from "@/context/ClientContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const useSurveyIdCheck = () => {
  const { setCurrentSurveyId, currentSurveyId, survey } =
    useContext(ClientContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentSurveyId && router.isReady) {
      const { surveyId } = router.query;
      if (!surveyId) {
        router.push("/client");
      }
      setCurrentSurveyId(surveyId);
    }
  }, [router.isReady, survey]);
};

export default useSurveyIdCheck;
