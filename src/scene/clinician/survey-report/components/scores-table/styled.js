import styled from "@emotion/styled";
import { TableContainer, TableHead } from "@mui/material";

export const StyledTableHead = styled(TableHead)`
  border: 1px solid var(--pufi-grey, #d9d9d9);
  background: var(--pufi-grey-light, #f2f2f2);

  & .MuiTableCell-root {
    border: 1px solid var(--pufi-grey, #d9d9d9);
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  & .MuiTableCell-root {
    justify-content: center;
    align-items: center;
    align-self: stretch;
    font-size: 0.875rem;
    font-weight: 600;
  }

  & .answer {
    min-width: 312px;
  }
`;
