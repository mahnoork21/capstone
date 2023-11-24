import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const EmptyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 24px 0;
  gap: 16px 0;

  & img:last-child {
    visibility: hidden;
  }

  p {
    font-weight: 600;

    @media only screen and (min-width: ${breakpoint.desktop}) {
      font-size: 1.5rem;
    }
  }

  button {
    display: flex;
    width: 200px;
    height: 40px;
    padding: 8px 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid #1979be;
    background: var(--pufi-primary-blue, #1979be);

    @media only screen and (min-width: ${breakpoint.desktop}) {
      padding: 10px 36px;
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 0 24px;
  }
`;

export const MainContainer = styled.div`
  & .outer-cards-container,
  .inner-cards-container {
    display: flex;
    flex-direction: column;
  }

  & h1 {
    color: #000;
    font-family: Open Sans;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    padding-left: 11px;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  & .cards-status-heading {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    color: #000;
    font-size: 1rem;
    font-weight: 700;
    padding-left: 11px;

    @media only screen and (min-width: ${breakpoint.desktop}) {
      font-size: 1.25rem;
    }

    @media only screen and (max-width: ${breakpoint.desktop}) {
      & span {
        max-width: 190px;
      }
    }
  }

  & .completed {
    margin-top: 20px;
  }

  @media only screen and (max-width: ${breakpoint.desktop}) {
    & h1 {
      font-size: 1.375rem;
    }
  }
`;

export const StyledButton = styled(Button)`
  color: var(--pufi-primary-blue, #1979be);
  font-size: 1rem;
  font-weight: 700;
  text-transform: none;
  width: 100px;

  @media only screen and (max-width: ${breakpoint.desktop}) {
    font-size: 0.875rem;
  }
`;

export const AddClientButton = styled(Button)`
  display: flex;
  padding: 10px 36px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #1979be;
  background: var(--pufi-primary-blue, #1979be);

  color: var(--primary-contrast, #fff);
  font-size: 1.25rem;
  font-weight: 600;

  @media only screen and (max-width: ${breakpoint.desktop}) {
    display: inline-flex;
    font-size: 0.875rem;
    padding: 8px 20px;
  }
`;
