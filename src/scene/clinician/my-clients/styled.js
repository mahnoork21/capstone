import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { breakpoint } from "@/styles/breakpoints";

export const MainContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 12px;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 8px;
  }
`;

export const HeadingBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  max-width: 1120px;
`;

export const MyClientsHeadingTypography = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 8px 0;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    font-size: 1.5rem;
  }
`;

export const MainContentBox = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const AddClientButton = styled(Button)`
  color: var(--primary-contrast, #fff);
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #1979be;
  background: var(--pufi-primary-blue, #1979be);
  width: 110px;
  font-size: 0.875rem;

  &:hover {
    color: var(--primary-blue, #1979be);
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 160px;
    font-size: 1.25rem;
    margin-top: 16px;
    border-radius: 12px;
  }
`;
