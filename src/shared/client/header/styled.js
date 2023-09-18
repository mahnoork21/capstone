import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const HeaderButton = styled(Button)`
  color: white;
  border-color: white;
  padding: 16px 36px;
  border-radius: 12px;
  border-width: 2px;
  font-size: 16px;
`;

export const HeaderContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  & > span {
    font-size: 40px;
    color: white;
    font-weight: 700;
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 0 24px;
    margin-bottom: 20px;
  }
`;
