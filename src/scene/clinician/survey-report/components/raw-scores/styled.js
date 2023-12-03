import styled from "@emotion/styled";
import { TableCell, TableContainer, TableRow } from "@mui/material";
import Image from "next/image";

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
  justify-content: center;
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
