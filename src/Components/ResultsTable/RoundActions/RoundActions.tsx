import { ButtonGroup } from "@mui/material";

import EditRound from "./EditRound/EditRound";

interface RoundActionsProps {
  editModalOpenTrue: (roundIndex: number) => void;
}

const RoundActions = ({ editModalOpenTrue }: RoundActionsProps) => {
  return (
    <ButtonGroup>
      <EditRound editModalOpenTrue={editModalOpenTrue} />
    </ButtonGroup>
  );
};

export default RoundActions;
