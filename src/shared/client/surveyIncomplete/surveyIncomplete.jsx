import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";

const SurveyIncomplete = ({ onCancel, onLeave }) => {
  return (
    <Dialog open={true} onClose={() => {}}>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Leave Survey
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "6px !important" }}>
        <Grid container spacing={2} direction="column">
          <Grid item>Your progress will be lost.</Grid>
          <Grid item>Are you sure you want to leave the survey?</Grid>
          <br />
          <Grid item container justifyContent="center">
            <Button
              onClick={onCancel}
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                background: "lightgrey",
                color: "black",
                ":hover": { background: "grey" },
              }}
            >
              Stay
            </Button>
            <Button
              onClick={onLeave}
              type="submit"
              variant="contained"
              color="success"
              sx={{ marginLeft: "10px", textTransform: "none" }}
            >
              Leave
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyIncomplete;
