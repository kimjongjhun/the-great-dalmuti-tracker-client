import { useState, useEffect } from "react";
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
  first?: boolean;
  numberOfPlayers: number;
  addNewRound: (arg0: {
    requestBody: { date: Moment; results: string[] };
  }) => void;
  playersList?: string[];
}

const AddNewRound = ({
  first = false,
  numberOfPlayers,
  addNewRound,
  playersList = [],
}: AddNewRoundProps) => {
  const [dateInput, setDateInput] = useState<Moment>(moment());
  const [playersOrder, setPlayersOrder] = useState<{ [index: number]: string }>(
    {}
  );
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [playersSelectList, setPlayersSelectList] = useState<string[]>([]);

  useEffect(() => {
    createPlayersSelectList();
  }, []);

  useEffect(() => {
    setPlayersOrderToEmpty();
  }, [numberOfPlayers]);

  useEffect(() => {
    checkSubmitDisabled();
  }, [playersOrder]);

  const createPlayersSelectList = (name?: string) => {
    if (name) {
      const filteredList = playersSelectList.filter(
        (player) => player !== name
      );
      setPlayersSelectList(filteredList);
    } else {
      setPlayersSelectList(playersList);
    }
  };

  const setPlayersOrderToEmpty = () => {
    const playersOrderObject: { [index: number]: string } = {};
    for (let x = 0; x < numberOfPlayers; x++) {
      playersOrderObject[x] = "";
    }
    setPlayersOrder(playersOrderObject);
  };

  const setDateToToday = () => {
    const today = moment.utc();

    setDateInput(today);
  };

  const handleDateChange = (input: MomentInput) => {
    setDateInput(moment(input));
  };

  const handlePlayersInput = (value: string, index: number) => {
    if (!first) {
      createPlayersSelectList(value);
    }
    setPlayersOrder({ ...playersOrder, [index]: value });
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
          first={first}
          numberOfPlayers={numberOfPlayers}
          playersOrder={playersOrder}
          handlePlayersInput={handlePlayersInput}
          disabled={saving}
          playerNames={playersSelectList?.map((player) => {
            return { label: player };
          })}
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
            <IconButton
              disabled={submitDisabled}
              color={"error"}
              onClick={handleClearClick}
            >
              <DeleteOutlineOutlined />
            </IconButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default AddNewRound;
