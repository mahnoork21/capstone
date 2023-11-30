import React, { useState } from "react";
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
import { addNewSurvey } from "@/firebase/clinicianRepo";

export default function AddNewSurveyCard({ toggleForm, clientId }) {
  const [surveyType, setSurveyType] = useState("Young Child");
  const handleSurveyTypeChange = (e) => setSurveyType(e.target.value);

  const handleAddSurveyClick = async () => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    try {
      await addNewSurvey(orgId, clinicianId, clientId, surveyType);

      toggleForm();
    } catch (err) {
      console.log("An error occured: " + err);
    }
  };

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
              value={surveyType}
              onChange={handleSurveyTypeChange}
            >
              <ModifiedFormControlLabel
                value="Young Child"
                control={<Radio />}
                label="Young Child"
              />
              <ModifiedFormControlLabel
                value="Older Child (Parent)"
                control={<Radio />}
                label="Older Child (Parent)"
              />
              <ModifiedFormControlLabel
                value="Older Child (Self Report)"
                control={<Radio />}
                label="Older Child (Self Report)"
              />
            </RadioGroup>
          </FormControl>
        </FormBox>
      </StyledCardContent>
      <StyledCardActions>
        <AddSurveyButton onClick={handleAddSurveyClick}>
          ADD SURVEY
        </AddSurveyButton>
        <CancelButton onClick={toggleForm}>CANCEL</CancelButton>
      </StyledCardActions>
    </StyledMainCard>
  );
}
