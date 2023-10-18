import React, { useState } from "react";
import {
  ClientListCard,
  NumberOfClientsTypography,
  StyledCardActions,
  StyledCardContent,
  StyledSearchBox,
  StyledSearchInputBase,
  StyledSearchTextField,
} from "./styled";
import {
  CardActions,
  CardContent,
  Box,
  InputBase,
  IconButton,
  Pagination,
  List,
} from "@mui/material";
import {
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  Search,
} from "@mui/icons-material";
import ClientListItem from "./components/ClientListItem";

const clientsListData = [
  {
    clientId: "Client-12345",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-123456",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-123457",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-12348",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-12349",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1234510",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1234511",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1234512",
    clientAddDate: "Added - September 16th, 2023",
  },
];

const MyClients = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // For Selection of Clients list
  const [selectedIndex, setSelectedIndex] = useState();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <ClientListCard>
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

          <List>
            {clientsListData
              .slice(8 * (page - 1), 8 * page)
              .map(({ clientId, clientAddDate }) => (
                <ClientListItem
                  key={clientId}
                  clientId={clientId}
                  clientAddDate={clientAddDate}
                  selectedIndex={selectedIndex}
                  handleListItemClick={handleListItemClick}
                />
              ))}
          </List>
        </StyledCardContent>
        <StyledCardActions>
          <Pagination
            color="primary"
            count={Math.ceil(clientsListData.length / 8)}
            page={page}
            siblingCount={0}
            onChange={handlePageChange}
          />
        </StyledCardActions>
      </ClientListCard>
    </>
  );
};

export default MyClients;
