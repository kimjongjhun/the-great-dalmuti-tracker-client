import { useState } from "react";
import {
  Paper,
  Table,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  PersonAddAlt1Outlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import { Moment } from "moment";

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
      <Grid container justifyContent={"center"} spacing={1}>
        <Grid>
          <Typography
            variant={"h6"}
          >{`Creating a new game for ${numberOfPlayers} people`}</Typography>
        </Grid>
        <Grid xs={12}>
          <Table>
            <AddNewRound
              numberOfPlayers={numberOfPlayers}
              addNewRound={createGame}
            />
          </Table>
        </Grid>
        <Grid>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddFirstRound;
