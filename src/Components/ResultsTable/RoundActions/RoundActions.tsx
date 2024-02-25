import { ButtonGroup } from "@mui/material";

import EditRound from "./EditRound/EditRound";

interface RoundActionsProps {
  roundIndex: number;
}

const RoundActions = ({ roundIndex }: RoundActionsProps) => {
  return (
    <ButtonGroup>
      <EditRound roundIndex={roundIndex} />
    </ButtonGroup>
  );
};

export default RoundActions;
