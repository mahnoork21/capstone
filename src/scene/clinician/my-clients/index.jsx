import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  AddClientButton,
  AddNewSurveyButton,
  BackButton,
  ButtonsBox,
  FilterSurveyButton,
  MainContentBox,
  MyClientsHeadingTypography,
  NumberOfSurveysTypography,
  StyledBox2,
  StyledBox3,
  StyledBox4,
  StyledBox5,
  StyledButtonsBox2,
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

import ClientListItem from "./components/clientListItem";
import ClientSurveyCard from "@/shared/clinician/clientSurveyCard";
import { ClinicianContext } from "@/context/ClinicianContext";
import ClientListCard from "./components/clientListCard";
import FilterBy from "./components/filterBy";

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
    clientId: "client1234",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client1235",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client1236",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client1237",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client1238",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client1239",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client12310",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client12311",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client12312",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client12313",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client12314",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client12315",
    surveyId: "849be0e3aea7-433b-849f-9844a2d91532",
    type: "Older Child(Parent)",
    creationDate: "10/09/2023",
    completionDate: undefined,
    percentageComplete: 40,
  },
  {
    clientId: "client12316",
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
  const handleClientsPageNoClick = (value) => {
    setClientsPageNo(value);
  };

  const [surveysPageNo, setSurveysPageNo] = useState(1);

  // For Selection of Clients list
  const [selectedIndex, setSelectedIndex] = useState();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanelClick = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsFilterPanelOpen((s) => !s);
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
          <ClientListCard
            clientsListData={clientsListData}
            clientsPageNo={clientsPageNo}
            handleClientsPageNoClick={handleClientsPageNoClick}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
          />
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
                <FilterSurveyButton onClick={toggleFilterPanelClick}>
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
                      key={clientId}
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
              <NumberOfSurveysTypography>
                {6 * surveysPageNo - 5} -
                {" " + Math.min(6 * surveysPageNo, surveysListData.length)} of
                {" " + surveysListData.length} Surveys
              </NumberOfSurveysTypography>
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
      <FilterBy
        isFilterPanelOpen={isFilterPanelOpen}
        toggleFilterPanelClick={toggleFilterPanelClick}
      />
    </StyledBox4>
  );
};

export default MyClients;
