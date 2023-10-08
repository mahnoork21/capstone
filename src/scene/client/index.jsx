import YoutubeEmbed from "@/shared/client/youtubeEmbed/YoutubeEmbed";

import HomeContainer from "./components/home-container";
import { GreyP } from "./components/home-container/styled";
import { StyledButton } from "./components/button";
import MainContainer from "@/shared/components/main-container";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ClientContext } from "@/context/ClientContext";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ClientHome = () => {
  const [wideMode, setWideMode] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentSurveyId, handleStartSurveyClick } =
    useContext(ClientContext);

  const router = useRouter();
  const { surveyId } = router.query;
  setCurrentSurveyId(surveyId);

  const handlePlay = () => {
    setWideMode(!wideMode);
    console.log("IM HERE");
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

  return (
    <MainContainer>
      <HomeContainer>
        <div className="content">
          <h1 className="intro-body-header">What is PUFI-2 survey?</h1>
          <p>
            The PUFI-2 questionnaire lets children and parents tell their
            clinicians about the functional use of a prosthetic device at home,
            at school, and in the community.
          </p>
          <p>
            Responses to these questions provide clinicians with meaningful
            information that can be used for prosthetic treatment planning and
            functional and prosthetic training in daily activities.
          </p>
        </div>

        <div>
          <YoutubeEmbed
            embedId="7C8MMd7iiEU"
            wideMode={wideMode}
            onClick={handlePlay}
          />
          <GreyP>SELECT THE PLAY BUTTON TO START THE VIDEO.</GreyP>
        </div>

        <div className="buttons">
          <StyledButton primary variant="contained" onClick={handleOnClick}>
            START SURVEY
          </StyledButton>

          <StyledButton variant="outlined">VIEW INSTRUCTIONS</StyledButton>
        </div>

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
