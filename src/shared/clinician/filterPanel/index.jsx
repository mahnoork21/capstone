import { useRouter } from "next/router";
import React, { useState } from "react";
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
} from "./styled";
import { Checkbox, Toolbar } from "@mui/material";

export default function FilterPanel({
  isFilterPanelOpen,
  toggleFilterPanelClick,
}) {
  const router = useRouter();

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
  const handleToggle = (heading, name) => () => {
    setCheckedItems((ci) => ({
      ...ci,
      [heading]: {
        ...ci[heading],
        [name]: !ci[heading][name],
      },
    }));
  };

  return (
    <StyledDrawer
      anchor={"right"}
      open={isFilterPanelOpen}
      onClose={toggleFilterPanelClick}
    >
      <MainContainerBox role="presentation">
        <Toolbar />
        <HeadingBox>Filter By</HeadingBox>

        <FilterOptionsBox>
          {router.pathname.split("/")[2] === "all-surveys" && (
            <StyledTextField
              id="inputClientId"
              label="Input Client Id"
              variant="outlined"
            />
          )}

          {Object.entries(checkedItems).map(([heading, listItems]) => {
            return (
              <StyledFiltersList key={heading}>
                <StyledFiltersHeadingTypography>
                  {heading}:
                </StyledFiltersHeadingTypography>

                {Object.entries(listItems).map(([name, isChecked]) => {
                  const labelId = heading + "-" + name.replace(" ", "-");

                  return (
                    <StyledListItem key={name}>
                      <StyledListItemButton
                        role={undefined}
                        onClick={handleToggle(heading, name)}
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
                })}
              </StyledFiltersList>
            );
          })}

          <StyledFiltersHeadingTypography>
            Added Date:
          </StyledFiltersHeadingTypography>
          <StyledTextField id="fromDate" label="From Date" variant="outlined" />
          <StyledTextField id="toDate" label="To Date" variant="outlined" />
        </FilterOptionsBox>
      </MainContainerBox>
    </StyledDrawer>
  );
}
