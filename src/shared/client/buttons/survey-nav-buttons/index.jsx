import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { StyledSurveyNavButton } from "./styled";

const SurveyNavButton = ({ children, isLoading, onClick, isBack = false }) => {
  return (
    <StyledSurveyNavButton variant="outlined" onClick={onClick}>
      <div>
        {isBack ? (
          isLoading ? (
            <CircularProgress size={20} thickness={6} />
          ) : (
            <Image width={30} height={20} src="/icons/back.svg" />
          )
        ) : (
          ""
        )}
        <span>{children}</span>
        {!isBack ? (
          isLoading ? (
            <CircularProgress size={20} thickness={6} />
          ) : (
            <Image width={30} height={20} src="/icons/next.svg" />
          )
        ) : (
          ""
        )}
      </div>
    </StyledSurveyNavButton>
  );
};

export default SurveyNavButton;
