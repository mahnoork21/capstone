import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { HeadingBox, StyledImageContainer, StyledList } from "./styled";
import { ExpandMore } from "@mui/icons-material";
import Image from "next/image";
import { useContext } from "react";
import { ClinicianContext } from "@/context/ClinicianContext";

export default function HowToUseContent() {
  const { breakpoint } = useContext(ClinicianContext);

  return (
    <>
      <HeadingBox>
        <Typography variant="h5" component="h2">
          How to use the PUFI-2: <br />
        </Typography>
        <Typography variant="subtitle1">
          Adding Clients, Requesting Questionnaire Completion, and Reviewing
          Results
        </Typography>
      </HeadingBox>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-a-1-content"
          id="panel-a-1-header"
        >
          <Typography variant="h6">Add a Client</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            1. From the{" "}
            <b>
              <i>Dashboard</i>
            </b>{" "}
            or from the{" "}
            <b>
              <i>My Clients</i>
            </b>{" "}
            tab on the left-hand menu, click “Add Client”.
          </Typography>
          <StyledImageContainer>
            <Image
              src="/help/how-to-use/add-a-client-1.png"
              width={breakpoint === "desktop" ? 200 : 150}
              height={breakpoint === "desktop" ? 70 : 50}
              alt="Add a client button"
            />
          </StyledImageContainer>

          <Typography>
            2. Here you can enter the client&apos;s ID. This is the unique ID
            that will be associated to that client. You can use any combination
            of letters, numbers, or symbols for the client ID. Please ensure{" "}
            <b>not</b> to include any identifying information in the
            client&apos;s ID.
          </Typography>
          <StyledImageContainer>
            <Image
              src="/help/how-to-use/add-a-client-2.png"
              width={breakpoint === "desktop" ? 600 : 300}
              height={breakpoint === "desktop" ? 450 : 250}
              alt="Add a client button"
            />
          </StyledImageContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-a-2-content"
          id="panel-a-2-header"
        >
          <Typography variant="h6">Request Questionnaire Completion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            1. You can request a client to complete their questionnaire through
            the following methods:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;a. Click <b>EMAIL CLIENT</b> in the
            client&apos;s questionnaire card to launch your email app.
          </Typography>
          <StyledImageContainer>
            <Image
              src="/help/how-to-use/request-questionnaire-completion-1-a.png"
              width={breakpoint === "desktop" ? 450 : 300}
              height={breakpoint === "desktop" ? 270 : 180}
              alt="Client's questionnaire card"
            />
          </StyledImageContainer>
          <Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;b. Click the three dots on the client&apos;s
            questionnaire card to open other options:
          </Typography>
          <StyledList>
            <li>
              <b>
                <i>Open PUFI-2:</i>
              </b>{" "}
              This will open that client&apos;s questionnaire in a new tab. This
              can be useful if you are completing the questionnaire with your
              client present.
            </li>
            <li>
              <b>
                <i>Copy PUFI-2 Link:</i>
              </b>
              If you want to send the client the link directly, without our
              email template, click this option to copy the link to your
              clipboard.
            </li>
            <li>
              <b>
                <i>Copy Email Body:</i>
              </b>
              This will copy the email template with that client&apos;s link to
              your clipboard.
            </li>
          </StyledList>
          <StyledImageContainer>
            <Image
              src="/help/how-to-use/request-questionnaire-completion-1-b.png"
              width={breakpoint === "desktop" ? 450 : 300}
              height={breakpoint === "desktop" ? 500 : 350}
              alt="Add a client button"
            />
          </StyledImageContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-a-3-content"
          id="panel-a-3-header"
        >
          <Typography variant="h6">Viewing the PUFI-2 Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            1. Once a client has completed the PUFI-2, their questionnaire card
            will be green. Click <b>VIEW SCORES</b> to review the results of the
            submission.
          </Typography>
          <StyledImageContainer>
            <Image
              src="/help/how-to-use/viewing-the-pufi-2-results-1.png"
              width={breakpoint === "desktop" ? 450 : 300}
              height={breakpoint === "desktop" ? 270 : 180}
              alt="Client's questionnaire card"
            />
          </StyledImageContainer>

          <Typography>
            2. The <b>SUMMARY SCORES</b> page allows you to review the results
            in several ways:
          </Typography>

          <StyledImageContainer>
            <Image
              src="/help/how-to-use/viewing-the-pufi-2-results-2.png"
              width={breakpoint === "desktop" ? 630 : 300}
              height={breakpoint === "desktop" ? 380 : 120}
              alt="Add a client button"
            />
          </StyledImageContainer>
          <Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;a. Click <b>CHARTS</b> to review the results
            of each type of sub question in pie charts as well as the count of
            each type of answer.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;b. Click <b>RAW SCORES</b> to review the
            results in a table format for each activity. Here you can see if any
            comments were added by the client. Click the comment icon
            <Image
              src="/help/how-to-use/comment-icon.png"
              width={breakpoint === "desktop" ? 30 : 30}
              height={breakpoint === "desktop" ? 30 : 30}
              alt="Add a client button"
            />
            to see the comments.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
