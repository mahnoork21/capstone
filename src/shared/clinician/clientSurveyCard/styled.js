import styled from "@emotion/styled";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Link,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { breakpoint } from "@/styles/breakpoints";

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  // border-top: 10px solid #fcaf17;
  border-top: 10px solid ${(props) => props.topColor};
  border-radius: 8px;
  background: #fff;
  box-shadow: -4px 4px 8px 0px rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
  width: 100%;
  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 264px;
    // min-height: 175px;
    flex-direction: column;
  }
`;

export const StyledCardContent = styled(CardContent)`
  // display: flex;
  // flex-flow: row wrap;
  // flex-grow: 3;
  display: grid;
  grid-template-columns: auto 1fr;

  padding-right: 4px;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 8px;
  }
`;

export const StyledCardActions = styled(CardActions)`
  // display: flex;
  // flex-direction: column;
  // flex-grow: 3;
  // justify-content: center;
  gap: 8px;
  padding-left: 0;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    // flex-direction: row;
    padding: 8px;
    justify-content: flex-end;
  }
`;

export const StyledTypography1 = styled(Typography)`
  font-size: 0.75rem;
  font-weight: 400;
  // width: 100%;
  text-align: end;
`;

export const StyledTypography2 = styled(Typography)`
  padding-left: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  // width: 66%;
`;

export const StyledLink = styled(Link)`
  color: var(--primary-blue, #1979be);
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledIconButton = styled(IconButton)`
  width: 24px;
  height: 24px;
  padding: 8px;
  border-radius: 40px;
  background: var(--pufi-grey-light, #f2f2f2);
  color: black;
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  color: #000;
`;
