import { useContext, useEffect, useState } from "react";
import MainContainer from "@/shared/components/main-container";
import { HeaderButton, HeaderContainer, NavigationWrapper } from "./styled";
import { ClientContext } from "@/context/ClientContext";
import Link from "next/link";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import { getSurveyById, updateAnswerInSurvey } from "@/firebase/surveyRepo";
import { useRouter } from "next/router";
import { IconButton, MenuItem, Select, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { checkIfALLResponsesAreValid } from "@/scene/client/survey/helper/surveyHelper";

const Header = () => {
  const {
    breakpoint,
    headerButtonType,
    currentAnswer,
    currentActivityIndex,
    handleStartSurveyClick,
    setHeaderButtonType,
    isNavBarVisible,
    organizationId,
    clinicianId,
    surveyId,
    setErrors,
    setSurvey,
    setIsEditMode,
    locale,
    setLocale,
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
    } else if (headerButtonType === HeaderButtonType.SAVE_AND_EXIT) {
      await updateAnswerInSurvey(
        youngChildActivity[currentActivityIndex].id,
        currentAnswer
      );

      router.push({
        pathname: "/client",
        query: {
          orgId: organizationId,
          clinicianId: clinicianId,
          surveyId: surveyId,
        },
      });
    } else if (headerButtonType === HeaderButtonType.SAVE_CHANGES) {
      const error = checkIfALLResponsesAreValid(currentAnswer);
      if (!error) {
        await updateAnswerInSurvey(
          youngChildActivity[currentActivityIndex].id,
          currentAnswer
        );

        const survey = await getSurveyById(
          organizationId,
          clinicianId,
          surveyId
        );
        setSurvey(survey);

        setIsEditMode(false);
        router.push({
          pathname: "/client/summary",
          query: {
            orgId: organizationId,
            clinicianId: clinicianId,
            surveyId: surveyId,
          },
        });
      } else {
        setErrors(error);
      }
    }
  };

  const handleClose = () => {
    setError("");
  };

  const handleLocaleChange = (event) => {
    setLocale(event.target.value);
    localStorage.setItem("user-locale", event.target.value);
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
            <Select value={locale} onChange={handleLocaleChange}>
              <MenuItem value={"en"}>🇨🇦 EN</MenuItem>
              <MenuItem value={"fr"}>🇫🇷 FR</MenuItem>
            </Select>

            {breakpoint === "desktop" && (
              <Link
                href={{
                  pathname: "/client",
                  query: {
                    orgId: organizationId,
                    clinicianId: clinicianId,
                    surveyId: surveyId,
                  },
                }}
              >
                Home
              </Link>
            )}

            <HeaderButton
              variant={breakpoint === "desktop" ? "outlined" : "text"}
              onClick={handleOnClick}
            >
              {headerButtonType}
            </HeaderButton>
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
