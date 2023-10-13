import YoutubeEmbed from "@/shared/client/youtubeEmbed/YoutubeEmbed";

import HomeContainer from "./components/home-container";
import { GreyP } from "./components/home-container/styled";
import { StyledButton } from "./components/button";
import MainContainer from "@/shared/components/main-container";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ClientContext } from "@/context/ClientContext";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";

const ClientHome = () => {
  const [wideMode, setWideMode] = useState(false);
  const [error, setError] = useState("");
  const { handleStartSurveyClick, currentSurveyId, setHeaderButtonType } =
    useContext(ClientContext);

  const handleRedirect = () => {};

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
          <StyledButton primary variant="contained" onClick={handleOnClick}>
            START SURVEY
          </StyledButton>

          <Link
            href={{
              pathname: "/client/view-instructions",
              query: { surveyId: currentSurveyId },
            }}
          >
            <StyledButton variant="outlined" onClick={handleRedirect}>
              VIEW INSTRUCTIONS
            </StyledButton>
          </Link>
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
