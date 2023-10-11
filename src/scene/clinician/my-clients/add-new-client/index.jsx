import React from "react";
import {
  Button,
  CardContent,
  CardActions,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
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
              defaultValue="Hello World"
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
              <ModifiedFormLabel id="demo-radio-buttons-group-label">
                Select survey type:
              </ModifiedFormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
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
