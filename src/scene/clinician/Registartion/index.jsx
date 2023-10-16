import React from "react";
import { makeStyles } from "@mui/styles";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Typography, Container, Box, Paper, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
const Registration = () =>{
    return(
        <>
        <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              ml: {
                xs: 4, // Default margin for extra small screens
                sm: 4, // Margin for small screens
                md: 15, // Margin for medium screens
                lg: 20, // Margin for large screens (bigger than medium)
                xl: 25, // Margin for extra large screens
              },
              mr: {
                xs: 4, // Default margin for extra small screens
                sm: 4, // Margin for small screens
                md: 15, // Margin for medium screens
                lg: 20, // Margin for large screens (bigger than medium)
                xl: 25, // Margin for extra large screens
              },

              alignItems: "center",
              alignContent: "center",
              padding: "1rem",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ alignItems: "center", p: 2 }}
            >
              <b> Create a new Clinician account</b>
            </Typography>
    </Paper>
    </Box>
    </Container>
        </>
    );
};
export default Registration;