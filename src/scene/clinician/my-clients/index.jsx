import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  AddClientButton,
  AddNewSurveyButton,
  BackButton,
  ButtonsBox,
  ClientListCard,
  FilterSurveyButton,
  MainContentBox,
  MyClientsHeadingTypography,
  NumberOfClientsTypography,
  StyledBox2,
  StyledBox3,
  StyledBox4,
  StyledBox5,
  StyledButtonsBox2,
  StyledCardActions,
  StyledCardContent,
  StyledList1,
  StyledSearchBox,
  StyledSearchInputBase,
  StyledSearchTextField,
  SurveysBox,
} from "./styled";
import {
  CardActions,
  CardContent,
  Box,
  InputBase,
  IconButton,
  Pagination,
  List,
  ButtonGroup,
} from "@mui/material";
import {
  FilterListOutlined,
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  KeyboardBackspaceOutlined,
  Search,
} from "@mui/icons-material";

import ClientListItem from "./components/ClientListItem";
import ClientSurveyCard from "@/shared/clinician/clientSurveyCard";
import { ClinicianContext } from "@/context/ClinicianContext";

const clientsListData = [
  {
    clientId: "Client-12345",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Client-1235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Client-123",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Client-125",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Client-135",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Client-235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Client1235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Clien-1235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Cliet-1235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Clint-1235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Clent-1235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235Cient-1235",
    clientAddDate: "Added - September 16th, 2023",
  },
  {
    clientId: "Client-1235Client-1235lient-1235",
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

const surveysListData = [
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client123",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
];

const MyClients = () => {
  const router = useRouter();
  const { breakpoint } = useContext(ClinicianContext);

  const [clientsPageNo, setClientsPageNo] = useState(1);
  const [surveysPageNo, setSurveysPageNo] = useState(1);

  // For Selection of Clients list
  const [selectedIndex, setSelectedIndex] = useState();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const addClientButtonClick = () => {
    router.push("/clinician/my-clients/add-new-client");
  };

  return (
    <StyledBox4>
      <StyledBox5>
        <MyClientsHeadingTypography variant="h1">
          MY CLIENTS
        </MyClientsHeadingTypography>
        {breakpoint === "mobile" && (
          <AddClientButton onClick={addClientButtonClick}>
            Add Client
          </AddClientButton>
        )}
      </StyledBox5>
      <MainContentBox>
        {(breakpoint === "desktop" || !selectedIndex) && (
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
                  onClick={() => setClientsPageNo((n) => (n === 1 ? n : n - 1))}
                >
                  <KeyboardArrowLeftSharp />
                </IconButton>
                <IconButton
                  aria-label="keyboardArrowRight"
                  disabled={
                    clientsPageNo === Math.ceil(clientsListData.length / 8)
                  }
                  onClick={() =>
                    setClientsPageNo((n) =>
                      n === Math.ceil(clientsListData.length / 8) ? n : n + 1
                    )
                  }
                >
                  <KeyboardArrowRightSharp />
                </IconButton>
              </StyledButtonsBox2>
            </StyledCardActions>
          </ClientListCard>
        )}

        {(breakpoint === "desktop" || !!selectedIndex) && (
          <SurveysBox>
            <ButtonsBox>
              <div>
                {breakpoint === "mobile" && (
                  <BackButton
                    onClick={() => {
                      setSelectedIndex();
                      setSurveysPageNo(1);
                    }}
                  >
                    <KeyboardBackspaceOutlined />
                  </BackButton>
                )}
              </div>
              <div>
                <AddNewSurveyButton>Add New Survey</AddNewSurveyButton>
                <FilterSurveyButton>
                  <FilterListOutlined />
                  {breakpoint === "desktop" && "Filter"}
                </FilterSurveyButton>
              </div>
            </ButtonsBox>

            <StyledBox2>
              {surveysListData
                .slice(6 * (surveysPageNo - 1), 6 * surveysPageNo)
                .map(
                  ({
                    clientId,
                    surveyId,
                    type,
                    creationDate,
                    completionDate,
                    percentageComplete,
                  }) => (
                    <ClientSurveyCard
                      clientId={clientId}
                      surveyId={surveyId}
                      type={type}
                      creationDate={creationDate}
                      completionDate={completionDate}
                      percentageComplete={percentageComplete}
                    />
                  )
                )}
            </StyledBox2>

            <StyledBox3>
              <NumberOfClientsTypography>
                {6 * surveysPageNo - 5} -
                {" " + Math.min(6 * surveysPageNo, surveysListData.length)} of
                {" " + surveysListData.length} Clients
              </NumberOfClientsTypography>
              <StyledButtonsBox2>
                <IconButton
                  aria-label="keyboardArrowLeft"
                  disabled={surveysPageNo === 1}
                  onClick={() => setSurveysPageNo((n) => (n === 1 ? n : n - 1))}
                >
                  <KeyboardArrowLeftSharp />
                </IconButton>
                <IconButton
                  aria-label="keyboardArrowRight"
                  disabled={
                    surveysPageNo === Math.ceil(surveysListData.length / 6)
                  }
                  onClick={() =>
                    setSurveysPageNo((n) =>
                      n === Math.ceil(surveysListData.length / 6) ? n : n + 1
                    )
                  }
                >
                  <KeyboardArrowRightSharp />
                </IconButton>
              </StyledButtonsBox2>
            </StyledBox3>
          </SurveysBox>
        )}
      </MainContentBox>
      {breakpoint === "desktop" && (
        <AddClientButton onClick={addClientButtonClick}>
          Add Client
        </AddClientButton>
      )}
    </StyledBox4>
  );
};

export default MyClients;
