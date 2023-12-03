import { ClientContext } from "@/context/ClientContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const useSurveyIdCheck = () => {
  const { setOrganizationId, setClinicianId, setSurveyId, survey } =
    useContext(ClientContext);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && !survey) {
      const { orgId, clinicianId, surveyId } = router.query;
      if (!orgId || !clinicianId || !surveyId) {
        router.push("/client");
      }
      setOrganizationId(orgId);
      setClinicianId(clinicianId);
      setSurveyId(surveyId);
    }
  }, [router.isReady, survey]);
};

export default useSurveyIdCheck;
