import { useContext } from "react";
import {
  StyledClientIdTypography,
  StyledClientAddDateTypography,
  StyledListItemButton,
} from "./styled";
import { ListItemText } from "@mui/material";
import { ChevronRightOutlined } from "@mui/icons-material";
import { ClinicianContext } from "@/context/ClinicianContext";

const ClientListItem = ({
  clientId,
  clientAddDate,
  selectedIndex,
  handleListItemClick,
}) => {
  const { breakpoint } = useContext(ClinicianContext);

  return (
    <StyledListItemButton
      selected={selectedIndex === clientId}
      onClick={(event) => handleListItemClick(event, clientId)}
    >
      <ListItemText>
        <StyledClientIdTypography>{clientId}</StyledClientIdTypography>
        <StyledClientAddDateTypography>
          Added - {clientAddDate.toDate().toDateString()}
        </StyledClientAddDateTypography>
      </ListItemText>

      {breakpoint === "mobile" && <ChevronRightOutlined />}
    </StyledListItemButton>
  );
};

export default ClientListItem;
