import { useState } from "react";
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
import { useSnackbarContext } from "@/context/snackbarContext";

export default function AddNewSurveyCard({ toggleForm, clientId }) {
  const { showSnackbar } = useSnackbarContext();

  const [surveyType, setSurveyType] = useState("Young Child");
  const handleSurveyTypeChange = (e) => setSurveyType(e.target.value);

  const handleAddSurveyClick = async () => {
    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    try {
      await addNewSurvey(orgId, clinicianId, clientId, surveyType);

      toggleForm();
    } catch (err) {
      showSnackbar("error", err.message);
      console.log("An error occured: " + err);
    }
  };

  return (
    <StyledMainCard>
      <StyledCardContent>
        <HeadingTypography>Add new questionnaire</HeadingTypography>
        <FormBox component="form" noValidate autoComplete="off">
          <FormControl>
            <ModifiedFormLabel id="selectSurveyType">
              Select questionnaire type:
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
                label="Young Child (3 - 6 years old)"
              />
              {/* Commented out because we don't support Older Child survey for now */}
              {/* <ModifiedFormControlLabel
                value="Older Child (Parent)"
                control={<Radio />}
                label="Older Child (Parent) (7+ years old)"
              />
              <ModifiedFormControlLabel
                value="Older Child (Self Report)"
                control={<Radio />}
                label="Older Child (Self Report) (7+ years old)"
              /> */}
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
