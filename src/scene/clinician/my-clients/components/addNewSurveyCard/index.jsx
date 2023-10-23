import React from "react";
import {
  AddSurveyButton,
  CancelButton,
  FormBox,
  HeadingTypography,
  ModifiedFormControlLabel,
  ModifiedFormLabel,
  StyledCardActions,
  StyledCardContent,
  StyledMainCard,
} from "./styled";
import { FormControl, Radio, RadioGroup } from "@mui/material";

export default function AddNewSurveyCard({ onCancelClick }) {
  return (
    <StyledMainCard>
      <StyledCardContent>
        <HeadingTypography>Add new survey</HeadingTypography>
        <FormBox component="form" noValidate autoComplete="off">
          <FormControl>
            <ModifiedFormLabel id="selectSurveyType">
              Select survey type:
            </ModifiedFormLabel>
            <RadioGroup
              aria-labelledby="selectSurveyType"
              defaultValue="youngChild"
              name="radio-buttons-group"
            >
              <ModifiedFormControlLabel
                value="youngChild"
                control={<Radio />}
                label="Young Child"
              />
              <ModifiedFormControlLabel
                value="olderChildParent"
                control={<Radio />}
                label="Older Child (Parent)"
              />
              <ModifiedFormControlLabel
                value="olderChildSelfReport"
                control={<Radio />}
                label="Older Child (Self Report)"
              />
            </RadioGroup>
          </FormControl>
        </FormBox>
      </StyledCardContent>
      <StyledCardActions>
        <AddSurveyButton>ADD SURVEY</AddSurveyButton>
        <CancelButton onClick={onCancelClick}>CANCEL</CancelButton>
      </StyledCardActions>
    </StyledMainCard>
  );
}
