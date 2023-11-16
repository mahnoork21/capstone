import React, { useEffect } from "react";
import {
  StyledClientListCard,
  StyledCardContent,
  StyledCardActions,
  StyledClientsList,
  StyledSearchBox,
  StyledSearchInputBase,
  NumberOfClientsTypography,
  StyledForwardAndBackwardButtonsBox,
} from "./styled";
import { IconButton } from "@mui/material";
import {
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  Search,
} from "@mui/icons-material";
import ClientListItem from "../clientListItem";

const noOfItemsOnOnePage = 6;

export default function ClientListCard({
  clientsListData,
  selectedIndex,
  handleListItemClick,
  clientsPageNo,
  handleClientsPageNoClick,
}) {
  useEffect(() => {
    if (clientsListData.length === 0) {
      handleClientsPageNoClick(0);
    } else {
      handleClientsPageNoClick(1);
    }
  }, [clientsListData]);

  // const fetchClients = () => {

  // }
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

        <StyledClientsList>
          {clientsListData
            .slice(
              noOfItemsOnOnePage * (clientsPageNo - 1),
              noOfItemsOnOnePage * clientsPageNo
            )
            .map(([id, data]) => (
              <ClientListItem
                key={id}
                clientId={id}
                clientAddDate={data.added}
                selectedIndex={selectedIndex}
                handleListItemClick={handleListItemClick}
              />
            ))}
        </StyledClientsList>
      </StyledCardContent>
      <StyledCardActions>
        <NumberOfClientsTypography>
          {Math.max(noOfItemsOnOnePage * (clientsPageNo - 1) + 1, 0)} -
          {" " +
            Math.min(
              noOfItemsOnOnePage * clientsPageNo,
              clientsListData.length
            )}{" "}
          of
          {" " + clientsListData.length} Clients
        </NumberOfClientsTypography>
        <StyledForwardAndBackwardButtonsBox>
          <IconButton
            aria-label="keyboardArrowLeft"
            disabled={clientsPageNo === 1 || clientsPageNo === 0}
            onClick={() =>
              handleClientsPageNoClick((n) => (n === 1 ? n : n - 1))
            }
          >
            <KeyboardArrowLeftSharp />
          </IconButton>
          <IconButton
            aria-label="keyboardArrowRight"
            disabled={
              clientsPageNo ===
                Math.ceil(clientsListData.length / noOfItemsOnOnePage) ||
              clientsPageNo === 0
            }
            onClick={() =>
              handleClientsPageNoClick((n) =>
                n === Math.ceil(clientsListData.length / noOfItemsOnOnePage)
                  ? n
                  : n + 1
              )
            }
          >
            <KeyboardArrowRightSharp />
          </IconButton>
        </StyledForwardAndBackwardButtonsBox>
      </StyledCardActions>
    </StyledClientListCard>
  );
}
