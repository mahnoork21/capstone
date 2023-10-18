import React from "react";
import {
  StyledClientIdTypography,
  StyledClientAddDateTypography,
  StyledListItemButton,
} from "./styled";
import { ListItemButton, ListItemText } from "@mui/material";

const ClientListItem = ({
  clientId,
  clientAddDate,
  selectedIndex,
  handleListItemClick,
}) => {
  return (
    <StyledListItemButton
      selected={selectedIndex === clientId}
      onClick={(event) => handleListItemClick(event, clientId)}
    >
      <ListItemText>
        <StyledClientIdTypography>{clientId}</StyledClientIdTypography>
        <StyledClientAddDateTypography>
          {clientAddDate}
        </StyledClientAddDateTypography>
      </ListItemText>
    </StyledListItemButton>
  );
};

export default ClientListItem;
