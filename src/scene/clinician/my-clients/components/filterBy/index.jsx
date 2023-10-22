import React, { useState } from "react";
import {
  StyledBox1,
  StyledBox2,
  StyledBox3,
  StyledDrawer,
  StyledList1,
  StyledListItem,
  StyledListItemButton,
  StyledListItemIcon,
  StyledListItemText,
  StyledTextField,
  StyledTypography1,
} from "./styled";
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

export default function FilterBy({
  isFilterPanelOpen,
  toggleFilterPanelClick,
}) {
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
      <StyledBox1 role="presentation">
        <Toolbar />
        <StyledBox2>Filter By</StyledBox2>

        <StyledBox3>
          {Object.entries(checkedItems).map(([heading, listItems]) => {
            return (
              <StyledList1 key={heading}>
                <StyledTypography1>{heading}:</StyledTypography1>

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
              </StyledList1>
            );
          })}

          <StyledTypography1>Added Date:</StyledTypography1>
          <StyledTextField id="fromDate" label="From Date" variant="outlined" />
          <StyledTextField id="toDate" label="To Date" variant="outlined" />
        </StyledBox3>
      </StyledBox1>
    </StyledDrawer>
  );
}
