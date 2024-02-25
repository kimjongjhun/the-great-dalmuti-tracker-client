import { Modal } from "@mui/material";
import { results } from "../types/rounds";

interface EditRoundModalProps {
  open: boolean;
  onClose: () => void;
  roundInfo: results | undefined;
}

const EditRoundModal = ({ open, onClose, roundInfo }: EditRoundModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <>
        Edit Round Modal
        {roundInfo?.date}
        {roundInfo?.index}
        {roundInfo?.playerOrder}
      </>
    </Modal>
  );
};

export default EditRoundModal;
