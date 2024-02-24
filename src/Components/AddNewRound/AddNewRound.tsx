import { ChangeEvent, useState, useEffect } from "react";
import {
  ButtonGroup,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  CircularProgress,
} from "@mui/material";
import moment, { Moment, MomentInput } from "moment";
import { SaveOutlined, DeleteOutlineOutlined } from "@mui/icons-material";

import DateInputCell from "./DateInputCell/DateInputCell";
import PlayerInputCells from "./PlayerInputCells/PlayerInputCells";

interface AddNewRoundProps {
  numberOfPlayers: number;
  addNewRound: (arg0: {
    requestBody: { date: Moment; results: string[] };
  }) => void;
}

const AddNewRound = ({ numberOfPlayers, addNewRound }: AddNewRoundProps) => {
  const [dateInput, setDateInput] = useState<Moment>(moment());
  const [playersOrder, setPlayersOrder] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    setPlayersOrderToEmpty();
  }, []);

  useEffect(() => {
    checkSubmitDisabled();
  }, [playersOrder]);

  const setPlayersOrderToEmpty = () => {
    const playersOrderObject = {};
    for (let x = 0; x < numberOfPlayers; x++) {
      playersOrderObject[x] = "";
    }
    setPlayersOrder(playersOrderObject);
  };

  const setDateToToday = () => {
    const today = moment();

    setDateInput(today);
  };

  const handleDateChange = (input: MomentInput) => {
    setDateInput(moment(input));
  };

  const handlePlayersInput = ({
    index,
    event,
  }: {
    index: number;
    event: ChangeEvent;
  }) => {
    setPlayersOrder({ ...playersOrder, [index]: event.target.value });
  };

  const checkSubmitDisabled = () => {
    let disabled = true;

    for (const i in Object.values(playersOrder)) {
      if (playersOrder[i] === "") {
        disabled = true;
        break;
      } else {
        disabled = false;
      }
    }

    setSubmitDisabled(disabled);
  };

  const handleClearClick = () => {
    setPlayersOrderToEmpty();
    setDateToToday();
  };

  const handleSaveClick = async () => {
    const requestBody = {
      date: dateInput,
      results: Object.values(playersOrder) as string[],
    };

    setSaving(true);
    await addNewRound({ requestBody });
    handleClearClick();
    setSaving(false);
  };

  return (
    <TableBody>
      <TableRow>
        <DateInputCell
          dateInput={dateInput}
          handleDateChange={handleDateChange}
          disabled={saving}
        />
        <PlayerInputCells
          numberOfPlayers={numberOfPlayers}
          playersOrder={playersOrder}
          handlePlayersInput={handlePlayersInput}
          disabled={saving}
        />
        <TableCell align={"center"}>
          <ButtonGroup variant={"outlined"}>
            {saving ? (
              <CircularProgress size={24} />
            ) : (
              <IconButton
                color={"primary"}
                disabled={submitDisabled}
                onClick={handleSaveClick}
              >
                <SaveOutlined />
              </IconButton>
            )}
            <IconButton color={"error"} onClick={handleClearClick}>
              <DeleteOutlineOutlined />
            </IconButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default AddNewRound;
