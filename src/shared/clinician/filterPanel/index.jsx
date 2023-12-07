import { useRouter } from "next/router";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
import dayjs from "dayjs";

const FilterPanel = forwardRef(
  (
    { isFilterPanelOpen, toggleFilterPanelClick, updateFilteredSurveys },
    ref
  ) => {
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

    useEffect(() => {
      const savedFilterState = localStorage.getItem("filterState");
      if (savedFilterState) {
        const parsedState = JSON.parse(savedFilterState);
        console.log("parsedState.toDate -> ", parsedState.toDate);
        setFormValues(parsedState);

        // Set checked items based on filterState
        setCheckedItems({
          "Survey Type": parsedState.surveyType,
          "Survey Status": parsedState.surveyStatus,
        });
      }
    }, []);

    const resetForm = () => {
      setFormValues({
        clientId: "",
        surveyType: {
          "Young Child": false,
          "Older Child (Parent)": false,
          "Older Child (Self Report)": false,
        },
        surveyStatus: {
          Complete: false,
          "In-progress": false,
          Pending: false,
        },
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

      const newFilterState = {
        clientId: "",
        surveyType: {
          "Young Child": false,
          "Older Child (Parent)": false,
          "Older Child (Self Report)": false,
        },
        surveyStatus: {
          Complete: false,
          "In-progress": false,
          Pending: false,
        },
        fromDate: "",
        toDate: "",
      };

      localStorage.setItem("filterState", JSON.stringify(newFilterState));
    };

    const handleSearchByChange = (event) => {
      const selectedSearchBy = event.target.value;
      resetForm();
      setSearchBy(selectedSearchBy);
    };

    const handleInputChange = (field) => (event) => {
      const value = event.target.value;
      setFormValues((prevValues) => {
        const newValues = {
          ...prevValues,
          [field]: value,
        };
        localStorage.setItem("filterState", JSON.stringify(newValues));
        return newValues;
      });
    };

    const handleDateChange = (field) => (date) => {
      setFormValues((prevValues) => {
        const newValues = {
          ...prevValues,
          [field]: date,
        };
        localStorage.setItem("filterState", JSON.stringify(newValues));
        return newValues;
      });
    };

    const handleToggle = (heading, name) => () => {
      setCheckedItems((prevItems) => {
        const newItems = {
          ...prevItems,
          [heading]: {
            ...prevItems[heading],
            [name]: !prevItems[heading][name],
          },
        };
        const newFilterState = {
          ...formValues,
          surveyType: newItems["Survey Type"],
          surveyStatus: newItems["Survey Status"],
        };
        localStorage.setItem("filterState", JSON.stringify(newFilterState));
        return newItems;
      });
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

        default:
          return null;
      }
    };

    const renderSurveyTypeCheckboxes = () => {
      return (
        <StyledFiltersList>
          <StyledFiltersHeadingTypography>
            Questionnaire Type:
          </StyledFiltersHeadingTypography>
          {Object.entries(checkedItems["Survey Type"]).map(
            ([name, isChecked]) => {
              const labelId = "Questionnaire Type-" + name.replace(" ", "-");

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
            Questionnaire Status:
          </StyledFiltersHeadingTypography>
          {Object.entries(checkedItems["Survey Status"]).map(
            ([name, isChecked]) => {
              const labelId = "Questionnaire Status-" + name.replace(" ", "-");

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
            {formValues.fromDate != "" ? (
              <StyledDatePicker
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                label="From Date"
                value={dayjs(formValues.fromDate)}
                onChange={(date) =>
                  handleDateChange("fromDate")(date.toISOString())
                }
                renderInput={(params) => (
                  <StyledTextField {...params} variant="outlined" />
                )}
              />
            ) : (
              <StyledDatePicker
                label="From Date"
                onChange={(date) =>
                  handleDateChange("fromDate")(date.toISOString())
                }
                renderInput={(params) => (
                  <StyledTextField {...params} variant="outlined" />
                )}
              />
            )}

            {formValues.toDate != "" ? (
              <StyledDatePicker
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                label="To Date"
                value={dayjs(formValues.toDate)}
                onChange={(date) =>
                  handleDateChange("toDate")(date.toISOString())
                }
                renderInput={(params) => (
                  <StyledTextField {...params} variant="outlined" />
                )}
              />
            ) : (
              <StyledDatePicker
                label="To Date"
                onChange={(date) =>
                  handleDateChange("toDate")(date.toISOString())
                }
                renderInput={(params) => (
                  <StyledTextField {...params} variant="outlined" />
                )}
              />
            )}
          </LocalizationProvider>
        </>
      );
    };

    const handleButtonClick = () => {
      updateFilteredSurveys(formValues);
      toggleFilterPanelClick();
    };

    useImperativeHandle(ref, () => ({
      resetFormValues: resetForm,
    }));

    return (
      <StyledDrawer
        anchor={"right"}
        open={isFilterPanelOpen}
        onClose={toggleFilterPanelClick}
      >
        <MainContainerBox role="presentation">
          <Toolbar />
          <HeadingBox>
            {allSurveysPage ? "Search Questionnaire" : "Filter By"}
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
                <MenuItem value="surveyType">Questionnaire Type</MenuItem>
                <MenuItem value="surveyStatus">Questionnaire Status</MenuItem>
              </Select>
            </FormControl>

            {renderFormFields()}

            <StyledButton
              primary
              variant="contained"
              onClick={handleButtonClick}
            >
              {allSurveysPage ? "Search" : "Filter"}
            </StyledButton>
          </FilterOptionsBox>
        </MainContainerBox>
      </StyledDrawer>
    );
  }
);

FilterPanel.displayName = "FilterPanel";
export default FilterPanel;
