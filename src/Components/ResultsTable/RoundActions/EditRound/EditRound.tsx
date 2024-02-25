import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface EditRoundProps {
  roundIndex: number;
}

const EditRound = ({ roundIndex }: EditRoundProps) => {
  return (
    <IconButton>
      <EditOutlinedIcon />
    </IconButton>
  );
};

export default EditRound;
