import { ButtonGroup } from "@mui/material";

import EditRound from "./EditRound/EditRound";
import DeleteRound from "./DeleteRound/DeleteRound";

interface RoundActionsProps {
  editModalOpenTrue: () => void;
  deleteModalOpenTrue: () => void;
}

const RoundActions = ({
  editModalOpenTrue,
  deleteModalOpenTrue,
}: RoundActionsProps) => {
  return (
    <ButtonGroup>
      <EditRound editModalOpenTrue={editModalOpenTrue} />
      <DeleteRound deleteModalOpenTrue={deleteModalOpenTrue} />
    </ButtonGroup>
  );
};

export default RoundActions;
