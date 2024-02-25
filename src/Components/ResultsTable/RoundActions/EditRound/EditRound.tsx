import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface EditRoundProps {
  editModalOpenTrue: () => void;
}

const EditRound = ({ editModalOpenTrue }: EditRoundProps) => {
  return (
    <IconButton onClick={editModalOpenTrue}>
      <EditOutlinedIcon />
    </IconButton>
  );
};

export default EditRound;
