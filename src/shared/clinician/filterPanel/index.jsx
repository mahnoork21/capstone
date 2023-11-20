import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  MainContainerBox,
  HeadingBox,
  FilterOptionsBox,
  StyledDrawer,
  StyledFiltersList,
  StyledListItem,
  StyledListItemButton,
  StyledListItemIcon,
  StyledListItemText,
  StyledTextField,
  StyledFiltersHeadingTypography,
  StyledDatePicker,
  StyledButton,
} from "./styled";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function FilterPanel({
  isFilterPanelOpen,
  toggleFilterPanelClick,
  updateFilteredSurveys,
}) {
  const router = useRouter();

  const allSurveysPage = router.pathname.split("/")[2] === "all-surveys";

  const [checkedItems, setCheckedItems] = useState({
    "Survey Type": {
      "Young Child": false,
      "Older Child (Parent)": false,
      "Older Child (Self Report)": false,
    },
    "Survey Status": {
      Complete: false,
      "In-progress": false,
      Pending: false,
    },
  });

  const [formValues, setFormValues] = useState({
    clientId: "",
    surveyId: "",
    surveyType: checkedItems["Survey Type"],
    surveyStatus: checkedItems["Survey Status"],
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      surveyType: checkedItems["Survey Type"],
      surveyStatus: checkedItems["Survey Status"],
    }));
  }, [checkedItems["Survey Type"], checkedItems["Survey Status"]]);

  const [searchBy, setSearchBy] = useState("");

  const resetForm = () => {
    setFormValues({
      clientId: "",
      surveyId: "",
      surveyType: "",
      surveyStatus: "",
      fromDate: "",
      toDate: "",
    });

    setCheckedItems({
      "Survey Type": {
        "Young Child": false,
        "Older Child (Parent)": false,
        "Older Child (Self Report)": false,
      },
      "Survey Status": {
        Complete: false,
        "In-progress": false,
        Pending: false,
      },
    });
  };

  const handleSearchByChange = (event) => {
    const selectedSearchBy = event.target.value;
    resetForm();
    setSearchBy(selectedSearchBy);
  };

  const handleInputChange = (field) => (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  const handleDateChange = (field) => (date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: date,
    }));
  };

  const handleToggle = (heading, name) => () => {
    setCheckedItems((ci) => ({
      ...ci,
      [heading]: {
        ...ci[heading],
        [name]: !ci[heading][name],
      },
    }));
  };

  const renderFormFields = () => {
    switch (searchBy) {
      case "clientId":
        return (
          <>
            <StyledTextField
              id="inputClientId"
              label="Input Client Id"
              variant="outlined"
              value={formValues.clientId}
              onChange={handleInputChange("clientId")}
            />
            {renderSurveyTypeCheckboxes()}
            {renderSurveyStatusCheckboxes()}
            {renderDatePickers()}
          </>
        );

      case "surveyType":
        return (
          <>
            {renderSurveyTypeCheckboxes()}
            {renderSurveyStatusCheckboxes()}
            {renderDatePickers()}
          </>
        );

      case "surveyStatus":
        return (
          <>
            {renderSurveyStatusCheckboxes()}
            {renderDatePickers()}
          </>
        );

      case "surveyId":
        return (
          <StyledTextField
            id="inputSurveyId"
            label="Input Survey Id"
            variant="outlined"
            value={formValues.surveyId}
            onChange={handleInputChange("surveyId")}
          />
        );

      default:
        return null;
    }
  };

  const renderSurveyTypeCheckboxes = () => {
    return (
      <StyledFiltersList>
        <StyledFiltersHeadingTypography>
          Survey Type:
        </StyledFiltersHeadingTypography>
        {Object.entries(checkedItems["Survey Type"]).map(
          ([name, isChecked]) => {
            const labelId = "Survey Type-" + name.replace(" ", "-");

            return (
              <StyledListItem key={name}>
                <StyledListItemButton
                  role={undefined}
                  onClick={handleToggle("Survey Type", name)}
                  dense
                >
                  <StyledListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isChecked}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </StyledListItemIcon>
                  <StyledListItemText id={labelId} primary={name} />
                </StyledListItemButton>
              </StyledListItem>
            );
          }
        )}
      </StyledFiltersList>
    );
  };

  const renderSurveyStatusCheckboxes = () => {
    return (
      <StyledFiltersList>
        <StyledFiltersHeadingTypography>
          Survey Status:
        </StyledFiltersHeadingTypography>
        {Object.entries(checkedItems["Survey Status"]).map(
          ([name, isChecked]) => {
            const labelId = "Survey Status-" + name.replace(" ", "-");

            return (
              <StyledListItem key={name}>
                <StyledListItemButton
                  role={undefined}
                  onClick={handleToggle("Survey Status", name)}
                  dense
                >
                  <StyledListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isChecked}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </StyledListItemIcon>
                  <StyledListItemText id={labelId} primary={name} />
                </StyledListItemButton>
              </StyledListItem>
            );
          }
        )}
      </StyledFiltersList>
    );
  };

  const renderDatePickers = () => {
    return (
      <>
        <StyledFiltersHeadingTypography>
          Added Date:
        </StyledFiltersHeadingTypography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            label="From Date"
            onChange={(date) =>
              handleDateChange("fromDate")(date.toISOString())
            }
            renderInput={(params) => (
              <StyledTextField {...params} variant="outlined" />
            )}
          />
          <StyledDatePicker
            label="To Date"
            onChange={(date) => handleDateChange("toDate")(date.toISOString())}
            renderInput={(params) => (
              <StyledTextField {...params} variant="outlined" />
            )}
          />
        </LocalizationProvider>
      </>
    );
  };

  const handleButtonClick = () => {
    updateFilteredSurveys(formValues, searchBy);
    resetForm();
    toggleFilterPanelClick();
  };

  return (
    <StyledDrawer
      anchor={"right"}
      open={isFilterPanelOpen}
      onClose={toggleFilterPanelClick}
    >
      <MainContainerBox role="presentation">
        <Toolbar />
        <HeadingBox>
          {allSurveysPage ? "Search Survey" : "Filter By"}
        </HeadingBox>

        <FilterOptionsBox>
          <FormControl fullWidth>
            <InputLabel id="searchSelectLabel">
              {allSurveysPage ? "Search By" : "Filter By"}
            </InputLabel>
            <Select
              labelId="searchSelectLabel"
              id="searchSelect"
              value={searchBy}
              label="Search By"
              onChange={handleSearchByChange}
            >
              {allSurveysPage && (
                <MenuItem value="clientId">Client Id</MenuItem>
              )}
              <MenuItem value="surveyType">Survey Type</MenuItem>
              <MenuItem value="surveyStatus">Survey Status</MenuItem>
              <MenuItem value="surveyId">Survey Id</MenuItem>
            </Select>
          </FormControl>

          {renderFormFields()}

          <StyledButton primary variant="contained" onClick={handleButtonClick}>
            {allSurveysPage ? "Search" : "Filter"}
          </StyledButton>
        </FilterOptionsBox>
      </MainContainerBox>
    </StyledDrawer>
  );
}
