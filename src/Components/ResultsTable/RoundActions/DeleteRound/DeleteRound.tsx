import { IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

interface DeleteRoundProps {
  deleteModalOpenTrue: () => void;
}

const DeleteRound = ({ deleteModalOpenTrue }: DeleteRoundProps) => {
  return (
    <IconButton onClick={deleteModalOpenTrue} color={"error"}>
      <DeleteForeverOutlinedIcon />
    </IconButton>
  );
};

export default DeleteRound;
