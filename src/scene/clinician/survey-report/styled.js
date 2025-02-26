import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Tab, Tabs } from "@mui/material";

export const Container = styled.div`
  margin-right: 50px;

  & .header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  & h1 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 36px */
  }

  & .download-button {
    color: var(--primary-contrast, #fff);
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 9px 0;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid #1979be;
    background: var(--pufi-primary-blue, #1979be);
    box-sizing: border-box;
    width: 100%
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    padding-left: 16px;
    padding-top: 12px;
    & .header-flex {
      flex-direction: column;
      align-items: start;
    }

    & .header-buttons {
      float: right;
    }
  }
`;

export const StyledTab = styled(Tab)`
  font-weight: bold;
`;

export const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid lightgray;
`;
