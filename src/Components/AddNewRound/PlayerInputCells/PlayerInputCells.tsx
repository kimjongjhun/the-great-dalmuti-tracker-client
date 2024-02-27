import { TableCell, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface PlayerInputCellsProps {
  numberOfPlayers: number;
  playersOrder: object;
  oldPlayersOrder?: object;
  handlePlayersInput: ({
    index,
    event,
  }: {
    index: number;
    event: ChangeEvent;
  }) => void;
  disabled: boolean;
  edit?: boolean;
}

const PlayerInputCells = ({
  numberOfPlayers,
  playersOrder,
  handlePlayersInput,
  disabled,
  edit = false,
  oldPlayersOrder,
}: PlayerInputCellsProps) => {
  const playerCells = [];

  for (let x = 0; x < numberOfPlayers; x++) {
    let label;

    if (x === 0) {
      label = "Dalmuti";
    } else if (x === numberOfPlayers - 1) {
      label = "Serf";
    } else {
      label = x + 1;
    }

    playerCells.push(
      <TableCell align={"center"}>
        <TextField
          placeholder={edit ? oldPlayersOrder[x] : label.toString()}
          value={playersOrder[x]}
          onChange={(e) => handlePlayersInput({ index: x, event: e })}
          disabled={disabled}
        />
      </TableCell>
    );
  }

  return playerCells;
};

export default PlayerInputCells;
