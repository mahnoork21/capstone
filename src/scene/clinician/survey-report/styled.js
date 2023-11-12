import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import {
  Popover,
  Tab,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
} from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Image from "next/image";

export const Container = styled.div`
  margin-right: 50px;
  & .header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid #1979be;
    background: var(--pufi-primary-blue, #1979be);
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    padding-left: 16px;
    padding-top: 12px;
    & .header-flex {
      flex-direction: column;
      align-items: start;
    }

    & .download-button {
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const BoldTableCell = styled(TableCell)`
  font-weight: bold;
`;

export const AnswerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
`;

export const StyledCommentIcon = styled(Image)`
  margin-left: 8px;
  border: 1px solid grey;
  border-radius: 4px;
`;

export const PopoverWrapper = styled.div`
  max-width: 500px;
  min-width: 300px;
  padding: 12px;
`;

export const PopoverContentItem = styled.div`
  margin-bottom: 8px;

  & > span:first-of-type {
    font-weight: bold;
  }
`;

export const FinalCommentWrapper = styled.div`
  margin: 16px 0;

  & > p:first-of-type {
    font-weight: bold;
  }
`;
