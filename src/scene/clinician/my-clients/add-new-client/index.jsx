import { useState } from "react";
import { useRouter } from "next/router";
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

// TODO: Show error if client ID already present

const AddNewClient = () => {
  const router = useRouter();

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

    const orgId = localStorage.getItem("orgId");
    const clinicianId = localStorage.getItem("clinicianId");

    try {
      await addNewClient(orgId, clinicianId, clientId, surveyType);

      router.push("/clinician/my-clients");
    } catch (err) {
      console.error("An error occured: " + err);
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
                Select questionnaire type:
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
