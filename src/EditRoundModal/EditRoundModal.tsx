import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  CircularProgress,
  IconButton,
} from "@mui/material";

import DateInputCell from "../Components/AddNewRound/DateInputCell/DateInputCell";
import { results } from "../types/rounds";
import moment, { Moment, MomentInput } from "moment";
import { DeleteOutlineOutlined, SaveOutlined } from "@mui/icons-material";
import PlayerInputCells from "../Components/AddNewRound/PlayerInputCells/PlayerInputCells";

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EditRoundModalProps {
  open: boolean;
  onClose: () => void;
  roundInfo: results;
  editRound: (arg0: {
    index: number;
    requestBody: { date: Moment | undefined; results: string[] | undefined };
  }) => void;
}

interface RenderActionsCellProps {
  saving: boolean;
  submitDisabled: boolean;
  handleSaveClick: () => void;
  handleClearClick: () => void;
}

const EditRoundModal = ({
  open,
  onClose,
  roundInfo,
  editRound,
}: EditRoundModalProps) => {
  const { playerOrder, date, index } = roundInfo;
  const numberOfPlayers = playerOrder.length;

  const [newPlayerOrder, setNewPlayerOrder] = useState<{
    [index: number]: string;
  }>({});
  const [newDate, setNewDate] = useState<{ date: Moment; edited: boolean }>({
    date: moment(),
    edited: false,
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [playersList, setPlayersList] = useState<{ label: string }[]>([]);

  useEffect(() => {
    handleClearClick();
    setPlayersSelectList();
  }, []);

  useEffect(() => {
    checkSubmitDisabled();
  }, [newPlayerOrder, newDate]);

  const setPlayersSelectList = (name?: string) => {
    if (name) {
      const filteredList = playersList.filter(
        (player) => player.label !== name
      );
      setPlayersList(filteredList);
    } else {
      setPlayersList(
        playerOrder.map((player: string) => {
          return {
            label: player,
          };
        })
      );
    }
  };

  const checkSubmitDisabled = () => {
    let disabled = true;

    if (newDate?.edited) {
      disabled = false;
    } else {
      disabled = checkPlayersArrayForEmpty();
    }
    setSubmitDisabled(disabled);
  };

  const checkPlayersArrayForEmpty = () => {
    let disabled = true;

    for (const i in Object.values(newPlayerOrder)) {
      if (newPlayerOrder[i] === "") {
        disabled = true;
        break;
      } else {
        disabled = false;
      }
    }

    return disabled;
  };

  const handleNewDateChange = (input: MomentInput) => {
    setNewDate({ date: moment(input), edited: true });
  };

  const handlePlayersInput = (value: string, index: number) => {
    setPlayersSelectList(value);
    setNewPlayerOrder((previousOrder: { [index: number]: string }) => {
      return { ...previousOrder, [index as number]: value };
    });
  };

  const resetPlayersOrder = () => {
    const resetPlayerObject: { [index: number]: string } = {};

    for (let x = 0; x < numberOfPlayers; x++) {
      resetPlayerObject[x] = "";
    }

    setNewPlayerOrder(resetPlayerObject);
  };

  const resetDate = () => {
    setNewDate({ date: moment(date), edited: false });
  };

  const handleClearClick = () => {
    resetPlayersOrder();
    resetDate();
  };

  const handleSaveClick = async () => {
    const requestBody = {
      date: newDate.edited ? newDate.date : undefined,
      results: checkPlayersArrayForEmpty()
        ? undefined
        : (Object.values(newPlayerOrder) as string[]),
    };

    setSaving(true);
    await editRound({ index, requestBody });
    handleClearClick();
    setSaving(false);
    onClose();
  };

  const handleOnClose = () => {
    handleClearClick();
    onClose();
  };

  const RenderTableHead = () => {
    const cells = [];

    for (let x = 0; x < numberOfPlayers; x++) {
      let label;
      if (x === 0) {
        label = "Dalmuti";
      } else if (x === numberOfPlayers - 1) {
        label = "Peasant";
      } else {
        label = x + 1;
      }
      cells.push(<TableCell align={"center"}>{label}</TableCell>);
    }
    return (
      <TableRow>
        <TableCell align={"center"}>New Date</TableCell>
        {cells}
        <TableCell align={"center"}>Actions</TableCell>
      </TableRow>
    );
  };

  const RenderActionsCell = ({
    saving,
    submitDisabled,
    handleSaveClick,
    handleClearClick,
  }: RenderActionsCellProps) => {
    return (
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
    );
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <Box sx={style}>
        <Table>
          <TableHead>
            <RenderTableHead />
          </TableHead>
          <TableBody>
            <TableRow>
              <DateInputCell
                dateInput={newDate.date}
                handleDateChange={handleNewDateChange}
                disabled={false}
              />
              <PlayerInputCells
                edit
                numberOfPlayers={numberOfPlayers}
                playersOrder={newPlayerOrder}
                oldPlayersOrder={playerOrder}
                handlePlayersInput={handlePlayersInput}
                disabled={saving}
                playerNames={playersList}
              />
              <RenderActionsCell
                saving={saving}
                submitDisabled={submitDisabled}
                handleSaveClick={handleSaveClick}
                handleClearClick={handleClearClick}
              />
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
};

export default EditRoundModal;
