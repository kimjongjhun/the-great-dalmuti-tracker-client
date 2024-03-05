import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { results } from "../types/rounds";
import moment from "moment";

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EditRoundModalProps {
  open: boolean;
  onClose: () => void;
  roundInfo: results;
  deleteRound: (arg0: { index: number }) => void;
}

const EditRoundModal = ({
  open,
  onClose,
  roundInfo,
  deleteRound,
}: EditRoundModalProps) => {
  const { date, index } = roundInfo;

  const [saving, setSaving] = useState<boolean>(false);

  const handleConfirmClick = async () => {
    setSaving(true);
    await deleteRound({ index });
    setSaving(false);
    onClose();
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <Box sx={style}>
        <Grid container direction={"column"} spacing={2}>
          <Grid container direction={"column"} justifyContent={"center"}>
            <Grid>
              <Typography variant={"h6"}>Deleting round</Typography>
            </Grid>
            <Grid>
              <Typography variant={"body1"}>
                {`You are about to delete the round on ${moment(date).format(
                  "MM/DD/YYYY"
                )} are you sure you want to proceed?`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent={"flex-end"}>
            <Grid>
              <Button color={"primary"} onClick={handleOnClose}>
                cancel
              </Button>
            </Grid>
            <Grid>
              {saving ? (
                <CircularProgress size={24} />
              ) : (
                <Button color={"error"} onClick={handleConfirmClick}>
                  delete
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditRoundModal;
