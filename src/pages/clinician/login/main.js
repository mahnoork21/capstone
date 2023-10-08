//import files
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Header } from "@/shared/clinician/header/Header";
import { Footer } from "@/shared/clinician/footer/Footer";
import {
  Accordion,
  Box,
  Button,
  Container,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { AccordionSummary, AccordionDetails } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { aboutNavbarItems } from "@/utils";
import { ClinicianContext } from "@/context/ClinicianContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const LoginLanding = () => {
  const formstyle = {
    display: "flex",
    padding: "0px 16px",
    flexDirection: "column",
    gap: 5,
    justifyContent: "space-between",
    width: "1024px",
    height: "480px",
    flexShrink: 0,
    borderRadius: "8px",
    background: "#FFF",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  };
  const labels = makeStyles({
    root: {
      position: "relative",
      fontFamily: "Open Sans",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 600,
    },
  });
  return (
    <>
      <Header></Header>
      {/* <Box sx={{ formstyle }}> */}
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
              <b> Log in to your clinician account</b>
            </Typography>
            <Box
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

                p: 2,
              }}
            >
              <form>
                <Typography sx={{ labels }}>Email or Clinician id</Typography>
                <input
                  type="text"
                  placeholder=""
                  display="inline-flex"
                  padding="0px 8px"
                  flex-direction="column"
                  align-items="flex-start"
                  flex-shrink="true"
                />
                <Typography sx={{ labels }}>Password</Typography>
                <input
                  type="password"
                  placeholder=""
                  display="inline-flex"
                  padding="0px 8px"
                  flex-direction="column"
                  align-items="flex-start"
                />
                <Typography align="right" sx={{ labels }}>
                  <u>Forgot Password?</u>
                </Typography>
                <Button
                  href="#"
                  variant="contained"
                  sx={{ width: "100%", mt: 2, mb: 2 }}
                >
                  {" "}
                  LOG IN
                </Button>
                <Typography sx={{ labels }}>
                  Don't have an account yet?
                </Typography>

                <Button
                  href="#"
                  variant="contained"
                  sx={{ width: "100%", mb: 2 }}
                >
                  {" "}
                  CREATE NEW ACCOUNT
                </Button>
              </form>
            </Box>
          </Paper>

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
              sx={{
                ml: 10,
                alignItems: "center",
                textAlign: "center",
                maxWidth: "650px",
                p: 2,
              }}
            >
              <b>
                Learn about the PUFI-2, how it was develped, and how it can be
                used.
              </b>
            </Typography>
            <Box>
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowForwardIosIcon />}
                    id="panel1-header"
                    aria-controler="panel1-content"
                  >
                    <Typography>
                      <b>What is PUFI-2 ?</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The Prosthetic Upper Extremity Functional Index (PUFI) is
                      a child- and parent-report questionnaire administered by a
                      health care practitioner that evaluates real-world
                      prosthesis use in a range of bimanual daily activities in
                      children using prostheses. One main goal for the PUFI is
                      to measure change in status over time. The PUFI-2 is not a
                      medical device. The PUFI-2 is intended to only be used by
                      health care practitioners as part of their care practice.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowForwardIosIcon />}
                    id="panel2-header"
                    aria-controler="panel2-content"
                  >
                    <Typography>
                      <b>Who is the PUFI-2 used for ?</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>text2</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowForwardIosIcon />}
                    id="panel3-header"
                    aria-controler="panel-content"
                  >
                    <Typography>
                      <b>Whai is the assessment process?</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>text3</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowForwardIosIcon />}
                    id="panel4-header"
                    aria-controler="panel1-content"
                  >
                    <Typography>
                      <b>When should the PUFI-2 be administered?</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>text4</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowForwardIosIcon />}
                    id="panel4-header"
                    aria-controler="panel1-content"
                  >
                    <Typography>
                      <b>Background and Research Involvement</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>text4</Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Box>
          </Paper>
        </Box>
        {/* </Box> */}
      </Container>
    </>
  );
};

export default LoginLanding;
