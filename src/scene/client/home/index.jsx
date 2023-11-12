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
    currentSurveyId,
    setHeaderButtonType,
    breakpoint,
    survey,
  } = useContext(ClientContext);

  const router = useRouter();

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
            <h1>What is PUFI-2 survey?</h1>
            <p>
              The PUFI-2 questionnaire lets children and parents tell their
              clinicians about the functional use of a prosthetic device at
              home, at school, and in the community.
            </p>
            <p>
              Responses to these questions provide clinicians with meaningful
              information that can be used for prosthetic treatment planning and
              functional and prosthetic training in daily activities.
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
          <PrimaryClientButton onClick={handleOnClick}>
            Start Survey
          </PrimaryClientButton>

          <SecondaryClientButton
            onClick={() => {
              router.push({
                pathname: "/client/view-instructions",
                query: { surveyId: currentSurveyId },
              });
            }}
          >
            View Instruction
          </SecondaryClientButton>
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
