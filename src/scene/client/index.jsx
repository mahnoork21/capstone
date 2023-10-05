import YoutubeEmbed from "@/shared/client/youtubeEmbed/YoutubeEmbed";

import HomeContainer from "./components/home-container";
import { GreyP } from "./components/home-container/styled";
import { StyledButton } from "./components/button";
import Link from "next/link";
import MainContainer from "@/shared/components/main-container";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ClientContext } from "@/context/ClientContext";

const ClientHome = () => {
  const { setCurrentSurveyId } = useContext(ClientContext);

  const router = useRouter();
  const { surveyId } = router.query;
  setCurrentSurveyId(surveyId);

  const handleRedirect = () => {};

  return (
    <MainContainer>
      <HomeContainer>
        <div className="content">
          <h1 className="intro-body-header">What is PUFI-2 survey?</h1>
          <p className="content-text">
            The PUFI-2 questionnaire lets children and parents tell their
            clinicians about the functional use of a prosthetic device at home,
            at school, and in the community.
          </p>
          <p className="content-text">
            Responses to these questions provide clinicians with meaningful
            information that can be used for prosthetic treatment planning and
            functional and prosthetic training in daily activities.
          </p>
        </div>

        <div>
          <YoutubeEmbed embedId="7C8MMd7iiEU" />
          <GreyP>SELECT THE PLAY BUTTON TO START THE VIDEO.</GreyP>
        </div>

        <div className="buttons">
          <Link href="/client/survey">
            <StyledButton primary variant="contained">
              START SURVEY
            </StyledButton>
          </Link>

          <Link href="/client/view-instructions">
            <StyledButton variant="outlined" onClick={handleRedirect}>
              VIEW INSTRUCTIONS
            </StyledButton>
          </Link>
        </div>
      </HomeContainer>
    </MainContainer>
  );
};

export default ClientHome;
