import React from "react";
import {
  StyledClientListCard,
  StyledCardContent,
  StyledCardActions,
  StyledList1,
  StyledSearchBox,
  StyledSearchInputBase,
  StyledSearchTextField,
  NumberOfClientsTypography,
  StyledButtonsBox2,
} from "./styled";
import { IconButton } from "@mui/material";
import {
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  Search,
} from "@mui/icons-material";
import ClientListItem from "../clientListItem";

export default function ClientListCard({
  clientsListData,
  clientsPageNo,
  selectedIndex,
  handleListItemClick,
  handleClientsPageNoClick,
}) {
  return (
    <StyledClientListCard>
      <StyledCardContent>
        <StyledSearchBox>
          <StyledSearchInputBase
            placeholder="Search by Client Id"
            inputProps={{ "aria-label": "Search by Client Id" }}
          />
          <IconButton type="button" aria-label="search">
            <Search />
          </IconButton>
        </StyledSearchBox>

        <StyledList1>
          {clientsListData
            .slice(8 * (clientsPageNo - 1), 8 * clientsPageNo)
            .map(({ clientId, clientAddDate }) => (
              <ClientListItem
                key={clientId}
                clientId={clientId}
                clientAddDate={clientAddDate}
                selectedIndex={selectedIndex}
                handleListItemClick={handleListItemClick}
              />
            ))}
        </StyledList1>
      </StyledCardContent>
      <StyledCardActions>
        <NumberOfClientsTypography>
          {8 * clientsPageNo - 7} -
          {" " + Math.min(8 * clientsPageNo, clientsListData.length)} of
          {" " + clientsListData.length} Clients
        </NumberOfClientsTypography>
        <StyledButtonsBox2>
          <IconButton
            aria-label="keyboardArrowLeft"
            disabled={clientsPageNo === 1}
            onClick={() =>
              handleClientsPageNoClick((n) => (n === 1 ? n : n - 1))
            }
          >
            <KeyboardArrowLeftSharp />
          </IconButton>
          <IconButton
            aria-label="keyboardArrowRight"
            disabled={clientsPageNo === Math.ceil(clientsListData.length / 8)}
            onClick={() =>
              handleClientsPageNoClick((n) =>
                n === Math.ceil(clientsListData.length / 8) ? n : n + 1
              )
            }
          >
            <KeyboardArrowRightSharp />
          </IconButton>
        </StyledButtonsBox2>
      </StyledCardActions>
    </StyledClientListCard>
  );
}
