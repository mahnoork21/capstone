import { Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { StyledTableContainer, StyledTableHead } from "./styled";

const ScoresTable = ({ scores }) => {
  const createData = (answer, count, percentage) => {
    return { answer, count, percentage };
  };

  const getTotal = Object.values(scores).reduce((acc, val) => acc + val, 0);
  const getPercentage = (score) => ((score * 100) / getTotal).toFixed(2) + "%";

  const rows = Object.entries(scores).map(([key, value]) =>
    createData(key, value, getPercentage(value))
  );
  rows.push(createData("Total", getTotal, getPercentage(getTotal)));

  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <StyledTableHead sx={{ background: "var(--pufi-grey-light, #F2F2F2)" }}>
          <TableRow>
            <TableCell>Answer</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Percentage</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.answer}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" className="answer">
                {row.answer}
              </TableCell>
              <TableCell>{row.count}</TableCell>
              <TableCell>{row.percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default ScoresTable;
