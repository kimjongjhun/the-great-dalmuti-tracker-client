import moment from "moment";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { rounds } from "../../types/rounds";

interface ResultsTableProps {
  rounds: rounds;
}

const ResultsTable = ({ rounds }: ResultsTableProps) => {
  const { results, numberOfPlayers } = rounds;

  const RenderPlayerNumber = ({ index }: { index: number }) => {
    let label;

    if (index === 0) {
      label = "Dalmuti";
    } else if (index === numberOfPlayers - 1) {
      label = "Serf";
    } else {
      label = index + 1;
    }

    return label;
  };

  const RenderTableHead = () => {
    const dataCells = [];
    for (let x = 0; x < numberOfPlayers; x++) {
      dataCells.push(
        <TableCell align={"center"}>
          <RenderPlayerNumber index={x} />
        </TableCell>
      );
    }

    return (
      <TableHead>
        <TableRow>
          <TableCell align={"center"}>Date</TableCell>
          {dataCells}
        </TableRow>
      </TableHead>
    );
  };

  const RenderTableBody = () => {
    return (
      <TableBody>
        {results.map((round, index) => {
          const { date, playerOrder } = round;
          const dataCells = [];

          const roundDate = moment(date).format("MM/DD/YYYY").toString();

          for (let x = 0; x < playerOrder.length; x++) {
            dataCells.push(
              <TableCell align={"center"}>{playerOrder[x]}</TableCell>
            );
          }

          return (
            <TableRow key={index}>
              <TableCell align={"center"}>{roundDate}</TableCell>
              {dataCells}
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {<RenderTableHead />}
        {<RenderTableBody />}
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
