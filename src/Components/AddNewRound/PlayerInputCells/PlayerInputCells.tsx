import { Autocomplete, TableCell, TextField } from "@mui/material";

interface PlayerInputCellsProps {
  numberOfPlayers: number;
  playersOrder: object;
  oldPlayersOrder?: object;
  handlePlayersInput: (label: string, index: number) => void;
  disabled: boolean;
  edit?: boolean;
  playerNames: { label: string }[];
  first?: boolean;
}

const PlayerInputCells = ({
  numberOfPlayers,
  playersOrder,
  handlePlayersInput,
  disabled,
  edit = false,
  oldPlayersOrder,
  playerNames,
  first = false,
}: PlayerInputCellsProps) => {
  const playerCells = [];

  for (let x = 0; x < numberOfPlayers; x++) {
    let label: string | number;

    if (x === 0) {
      label = "Dalmuti";
    } else if (x === numberOfPlayers - 1) {
      label = "Peasant";
    } else {
      label = x + 1;
    }

    playerCells.push(
      <TableCell align={"center"}>
        {first ? (
          <TextField
            placeholder={edit ? oldPlayersOrder[x] : label.toString()}
            value={playersOrder[x]}
            onChange={(e) => handlePlayersInput(e.target.value, x)}
            disabled={disabled}
          />
        ) : (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={playerNames}
            onChange={(_, value) => {
              handlePlayersInput(value?.label, x);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                value={playersOrder[x]}
                disabled={disabled}
                label={edit ? oldPlayersOrder[x] : label.toString()}
              />
            )}
          />
        )}
      </TableCell>
    );
  }

  return playerCells;
};

export default PlayerInputCells;
