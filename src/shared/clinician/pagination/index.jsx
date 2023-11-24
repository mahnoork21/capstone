import React from "react";

import { IconButton } from "@mui/material";
import {
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
} from "@mui/icons-material";
import {
  NumberOfSurveysTypography,
  PaginationBox,
  StyledForwardAndBackwardButtonsBox,
} from "./styled";

const Pagination = ({
  totalSurveysCount,
  surveysPageNo,
  handleSurveysPageNoClick,
}) => {
  const noOfItemsOnOnePage = 6;
  return (
    <PaginationBox>
      <NumberOfSurveysTypography>
        {Math.max(noOfItemsOnOnePage * (surveysPageNo - 1) + 1, 0)}
        {" - " +
          Math.min(noOfItemsOnOnePage * surveysPageNo, totalSurveysCount) || 0}
        {" of " + totalSurveysCount || 0} Surveys
      </NumberOfSurveysTypography>
      <StyledForwardAndBackwardButtonsBox>
        <IconButton
          aria-label="keyboardArrowLeft"
          disabled={surveysPageNo === 0 || surveysPageNo === 1}
          onClick={() => handleSurveysPageNoClick((n) => (n === 1 ? n : n - 1))}
        >
          <KeyboardArrowLeftSharp />
        </IconButton>
        <IconButton
          aria-label="keyboardArrowRight"
          disabled={
            surveysPageNo ===
              Math.ceil(totalSurveysCount / noOfItemsOnOnePage) ||
            surveysPageNo === 0
          }
          onClick={() =>
            handleSurveysPageNoClick((n) =>
              n === Math.ceil(totalSurveysCount / noOfItemsOnOnePage)
                ? n
                : n + 1
            )
          }
        >
          <KeyboardArrowRightSharp />
        </IconButton>
      </StyledForwardAndBackwardButtonsBox>
    </PaginationBox>
  );
};

export default Pagination;
