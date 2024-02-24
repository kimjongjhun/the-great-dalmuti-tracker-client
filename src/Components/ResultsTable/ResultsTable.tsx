import moment, { Moment } from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { rounds } from "../../types/rounds";
import AddNewRound from "../AddNewRound/AddNewRound";

interface ResultsTableProps {
  rounds: rounds;
  addNewRound: (arg0: {
    requestBody: { date: Moment; results: string[] };
  }) => void;
}

const ResultsTable = ({ rounds, addNewRound }: ResultsTableProps) => {
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
          <TableCell align={"center"}>Actions</TableCell>
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
        <RenderTableHead />
        <RenderTableBody />
        <AddNewRound
          numberOfPlayers={numberOfPlayers}
          addNewRound={addNewRound}
        />
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
