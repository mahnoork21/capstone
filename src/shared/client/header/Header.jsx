import React, { useContext, useEffect, useState } from "react";
import MainContainer from "@/shared/components/main-container";
import { HeaderButton, HeaderContainer, NavigationWrapper } from "./styled";
import { ClientContext } from "@/context/ClientContext";
import Link from "next/link";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import { updateAnswerInSurvey } from "@/firebase/surveyRepo";
import { useRouter } from "next/router";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const {
    breakpoint,
    headerButtonType,
    currentAnswer,
    currentActivityIndex,
    handleStartSurveyClick,
    setHeaderButtonType,
    isNavBarVisible,
    currentSurveyId,
  } = useContext(ClientContext);

  const router = useRouter();

  const [error, setError] = useState();

  useEffect(() => {
    setHeaderButtonType(HeaderButtonType.START_SURVEY);
  }, []);

  const handleOnClick = async () => {
    if (headerButtonType === HeaderButtonType.START_SURVEY) {
      const error = handleStartSurveyClick();
      if (error) {
        setError(error);
      }
    } else {
      await updateAnswerInSurvey(
        youngChildActivity[currentActivityIndex].id,
        currentAnswer
      );

      router.push({
        pathname: "/client",
        query: {
          surveyId: currentSurveyId,
        },
      });
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
      <HeaderContainer>
        <span>PUFI-2</span>

        {isNavBarVisible && (
          <NavigationWrapper>
            <Link
              href={{
                pathname: "/client",
                query: { surveyId: currentSurveyId },
              }}
            >
              Home
            </Link>

            {breakpoint === "desktop" ? (
              <HeaderButton variant="outlined" onClick={handleOnClick}>
                {headerButtonType === HeaderButtonType.SAVE_AND_EXIT
                  ? "SAVE AND EXIT"
                  : "START SURVEY"}
              </HeaderButton>
            ) : (
              <Link
                href={{
                  pathname: "/client/survey",
                  query: { surveyId: currentSurveyId },
                }}
              >
                {" "}
                {headerButtonType === HeaderButtonType.SAVE_AND_EXIT
                  ? "SAVE AND EXIT"
                  : "START SURVEY"}
              </Link>
            )}
          </NavigationWrapper>
        )}

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(error)}
          autoHideDuration={10000}
          onClose={handleClose}
          message={error}
          action={action}
        />
      </HeaderContainer>
    </MainContainer>
  );
};

export default Header;
