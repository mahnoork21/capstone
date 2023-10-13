import React from "react";
import {
  CardContent,
  CardActions,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
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
} from "./styled";

const AddNewClient = () => {
  return (
    <>
      <PageHeadingTypography>My Clients</PageHeadingTypography>
      <MobileContentCard>
        <CardContent>
          <MobileCardHeadingTypography>
            Add New Client
          </MobileCardHeadingTypography>

          <FormBox component="form" noValidate autoComplete="off">
            <ClientIdTypography>Input Client ID</ClientIdTypography>
            <ClientIdTextField
              id="outlined-basic"
              defaultValue=""
              variant="outlined"
              error={false}
            />

            <CenterFlexBox>
              <GreenInfoOutlinedIcon />
              <SmallTextTypography>
                Please don't include any personal information of client
              </SmallTextTypography>
            </CenterFlexBox>

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
        </CardContent>
        <CardActions>
          <MobileFullWidthButton variant="contained">
            Add Client
          </MobileFullWidthButton>
        </CardActions>
      </MobileContentCard>
    </>
  );
};

export default AddNewClient;
