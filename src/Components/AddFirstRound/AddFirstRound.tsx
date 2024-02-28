import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  ButtonGroup,
  TableCell,
  TableHead,
  IconButton,
  TableRow,
  Typography,
} from "@mui/material";
import {
  PersonAddAlt1Outlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";

import AddNewRound from "../AddNewRound/AddNewRound";

const DEFAULT_INITIAL_NUMBER_OF_PLAYERS = 4;

interface AddFirstRoundProps {
  createGame: (arg0: {
    requestBody: { date: Moment; results: string[] };
  }) => void;
}

const AddFirstRound = ({ createGame }: AddFirstRoundProps) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
    DEFAULT_INITIAL_NUMBER_OF_PLAYERS
  );

  const increaseNumberOfPlayers = () => {
    const newNumberOfPlayers = numberOfPlayers + 1;

    setNumberOfPlayers(newNumberOfPlayers);
  };

  const decreaseNumberOfPlayers = () => {
    const newNumberOfPlayers = numberOfPlayers - 1;

    setNumberOfPlayers(newNumberOfPlayers);
  };

  return (
    <Paper elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align={"center"}>
              <Typography
                variant={"h6"}
              >{`Creating a new game for ${numberOfPlayers} people`}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <AddNewRound
                numberOfPlayers={numberOfPlayers}
                addNewRound={createGame}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="justify">
              <ButtonGroup>
                <IconButton
                  onClick={decreaseNumberOfPlayers}
                  disabled={numberOfPlayers <= 4}
                >
                  <PersonRemoveOutlined />
                </IconButton>
                <IconButton
                  onClick={increaseNumberOfPlayers}
                  disabled={numberOfPlayers >= 8}
                >
                  <PersonAddAlt1Outlined />
                </IconButton>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AddFirstRound;
