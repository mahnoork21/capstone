import { breakpoint } from "@/styles/breakpoints";
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

  & .count {
    min-width: 50px;
  }

  & .percentage {
    min-width: 50px;
  }

  @media screen and (max-width: 1235px) {
    & .answer {
      min-width: 200px;
    }
  }

  @media screen and (max-width: 1130px) {
    & .answer {
      min-width: 150px;
    }
  }

  @media screen and (max-width: 1080px) {
    & .answer {
      min-width: 100px;
    }
  }

  @media screen and (max-width: ${breakpoint.desktop}) {
    & .answer {
      min-width: 100px;
    }
  }
`;
