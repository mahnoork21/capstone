import React, { useState } from "react";
import { CardActions, FormControl, RadioGroup, Radio } from "@mui/material";
import {
  FormBox,
  MobileCardHeadingTypography,
  MobileContentCard,
  PageHeadingTypography,
  ClientIdTypography,
  ClientIdTextField,
  CenterFlexBox,
  GreenInfoOutlinedIcon,
  SmallTextTypography,
  ModifiedFormControlLabel,
  ModifiedFormLabel,
  MobileFullWidthButton,
  StyledCardContent,
} from "./styled";
import { addNewClient } from "@/firebase/clinicianRepo";

const AddNewClient = () => {
  const [clientId, setClientId] = useState("");
  const handleClientIdChange = (e) => setClientId(e.target.value);

  const [surveyType, setSurveyType] = useState("Young Child");
  const handleSurveyTypeChange = (e) => setSurveyType(e.target.value);

  const [clientIdError, setClientIdError] = useState(false);

  const handleAddClientClick = async () => {
    if (clientId == "") {
      setClientIdError(true);
      return;
    } else {
      setClientIdError(false);
    }

    try {
      await addNewClient(
        "oZqnljuEU4b3jZtfHM9v",
        "fWft9AvZD4Mc5fR33ka6Q8vOYil2",
        clientId,
        surveyType
      );
    } catch (err) {
      console.log("An error occured: " + err);
    }
  };

  return (
    <>
      <PageHeadingTypography>My Clients</PageHeadingTypography>
      <MobileContentCard>
        <StyledCardContent>
          <MobileCardHeadingTypography>
            Add New Client
          </MobileCardHeadingTypography>

          <FormBox component="form" noValidate autoComplete="off">
            <ClientIdTypography>Input Client ID</ClientIdTypography>
            <ClientIdTextField
              id="outlined-basic"
              variant="outlined"
              error={clientIdError}
              helperText={clientIdError && "Please enter an ID"}
              value={clientId}
              onChange={handleClientIdChange}
            />

            <CenterFlexBox>
              <GreenInfoOutlinedIcon />
              <SmallTextTypography>
                {"Please don't include any personal information of client"}
              </SmallTextTypography>
            </CenterFlexBox>

            <FormControl>
              <ModifiedFormLabel id="selectSurveyType">
                Select survey type:
              </ModifiedFormLabel>
              <RadioGroup
                aria-labelledby="selectSurveyType"
                defaultValue="Young Child"
                value={surveyType}
                onChange={handleSurveyTypeChange}
                name="radio-buttons-group"
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
        <CardActions>
          <MobileFullWidthButton
            variant="contained"
            onClick={handleAddClientClick}
          >
            Add Client
          </MobileFullWidthButton>
        </CardActions>
      </MobileContentCard>
    </>
  );
};

export default AddNewClient;
