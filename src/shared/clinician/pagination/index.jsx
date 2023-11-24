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
  surveysListData,
  surveysPageNo,
  handleSurveysPageNoClick,
}) => {
  const noOfItemsOnOnePage = 6;
  return (
    <PaginationBox>
      <NumberOfSurveysTypography>
        {surveysListData.length == 0
          ? 0
          : Math.max(noOfItemsOnOnePage * (surveysPageNo - 1) + 1, 0)}
        {" - " +
          Math.min(
            noOfItemsOnOnePage * surveysPageNo,
            surveysListData.length
          ) || 0}
        {" of " + surveysListData.length || 0} Surveys
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
              Math.ceil(surveysListData.length / noOfItemsOnOnePage) ||
            surveysPageNo === 0 ||
            surveysListData.length === 0
          }
          onClick={() =>
            handleSurveysPageNoClick((n) =>
              n === Math.ceil(surveysListData.length / noOfItemsOnOnePage)
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
