import YoutubeEmbed from "@/shared/client/youtubeEmbed/YoutubeEmbed";

import {
  HomeContainer,
  GreyP,
  InfoWrapper,
  ContentWrapper,
  ButtonWrapper,
} from "./styled";
import MainContainer from "@/shared/components/main-container";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "@/context/ClientContext";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import InfoConfirmWrapper from "./components/info-confirm-wrapper";
import PrimaryClientButton from "@/shared/client/buttons/primary";
import SecondaryClientButton from "@/shared/client/buttons/secondary";
import { useRouter } from "next/router";

const ClientHome = () => {
  const [error, setError] = useState("");
  const {
    handleStartSurveyClick,
    setHeaderButtonType,
    breakpoint,
    organizationId,
    clinicianId,
    surveyId,
    survey,
  } = useContext(ClientContext);

  const router = useRouter();

  const handleViewInstructionsclick = () => {
    if (survey) {
      router.push({
        pathname: "/client/view-instructions",
        query: {
          orgId: organizationId,
          clinicianId: clinicianId,
          surveyId: surveyId,
        },
      });
    } else {
      setError(
        "Questionnaire Link is invalid. Please contact your clinician for a link to the questionnaire."
      );
    }
  };

  const handleOnClick = async () => {
    const error = handleStartSurveyClick();
    if (error) {
      setError(error);
    }
  };

  const handleClose = () => {
    setError("");
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  useEffect(() => {
    setHeaderButtonType(HeaderButtonType.START_SURVEY);
  }, []);

  return (
    <MainContainer>
      <HomeContainer>
        <InfoWrapper>
          <ContentWrapper>
            <h1>What is PUFI-2?</h1>
            <p>
              The Prosthetic Upper Limb Functional Index (PUFI-2) is a parent
              and child electronic questionnaire that measures children’s
              performance in daily bimanual activities, the ease of performance
              with/without the prosthesis and usefulness of the prosthesis. The
              results from the PUFI-2 can help clinicians work collaboratively
              with clients to inform goal setting and treatment planning.
            </p>
            <p>
              Start by learning more about the PUFI-2 in the introductory video.
            </p>

            {breakpoint === "desktop" && <InfoConfirmWrapper />}
          </ContentWrapper>

          <div>
            {breakpoint !== "desktop" && (
              <GreyP>SELECT THE PLAY BUTTON TO START THE VIDEO.</GreyP>
            )}
            <YoutubeEmbed />
            {breakpoint === "desktop" && (
              <GreyP $isDesktop={breakpoint === "desktop"}>
                SELECT THE PLAY BUTTON TO START THE VIDEO.
              </GreyP>
            )}
          </div>
        </InfoWrapper>

        {breakpoint !== "desktop" && <InfoConfirmWrapper />}

        <ButtonWrapper>
          <SecondaryClientButton onClick={handleViewInstructionsclick}>
            View Instructions
          </SecondaryClientButton>

          <PrimaryClientButton onClick={handleOnClick}>
            Start PUFI-2
          </PrimaryClientButton>
        </ButtonWrapper>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(error)}
          autoHideDuration={10000}
          onClose={handleClose}
          message={error}
          action={action}
        />
      </HomeContainer>
    </MainContainer>
  );
};

export default ClientHome;
