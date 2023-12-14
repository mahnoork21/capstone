import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { HeadingBox, StyledImageContainer } from "./styled";
import { ExpandMore } from "@mui/icons-material";
import Image from "next/image";
import { useContext } from "react";
import { ClinicianContext } from "@/context/ClinicianContext";

export default function FAQsContent() {
  const { breakpoint } = useContext(ClinicianContext);

  return (
    <>
      <HeadingBox>
        <Typography variant="h5" component="h2">
          Frequently Asked Questions: <br />
        </Typography>
      </HeadingBox>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-b-1-content"
          id="panel-b-1-header"
        >
          <Typography variant="h6">
            How do I delete or archive questionnaires?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Use the “Archive” feature to remove questionnaires. These can be
            restored under the “Archived” tab, if needed.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-b-2-content"
          id="panel-b-2-header"
        >
          <Typography variant="h6">
            Can my client start the questionnaire, partially complete it, and
            return at a later point?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, client&apos;s submissions will be saved automatically. They can
            close the questionnaire and return via their unique link to finish
            their submission.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-b-3-content"
          id="panel-b-3-header"
        >
          <Typography variant="h6">
            How do I know if my client has started the PUFI-2?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If your client has started the PUFI-2, their questionnaire card will
            turn yellow and you can see when they last opened the questionnaire
            as well as how complete the questionnaire is.
          </Typography>
          <StyledImageContainer>
            <Image
              src="/help/faqs/how-do-i-know-if-my-client-started.png"
              width={breakpoint === "desktop" ? 450 : 300}
              height={breakpoint === "desktop" ? 270 : 180}
              alt="Client's questionnaire card"
            />
          </StyledImageContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-b-4-content"
          id="panel-b-4-header"
        >
          <Typography variant="h6">
            How do I remind my client to complete the PUFI-2?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If client&apos;s have partially completed their questionnaire, you
            can remind them to complete via email. When viewing the
            client&apos;s questionnaire card, select <b>SEND REMINDER</b> button
            to open the email template in your email app. Or click the three
            dots for other options.
          </Typography>
          <StyledImageContainer>
            <Image
              src="/help/faqs/remind-client.png"
              width={breakpoint === "desktop" ? 450 : 300}
              height={breakpoint === "desktop" ? 270 : 180}
              alt="Client's questionnaire card"
            />
          </StyledImageContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-b-5-content"
          id="panel-b-5-header"
        >
          <Typography variant="h6">
            Can I download or print the questionnaire results?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can download the raw CSV file of the questionnaire results. To
            print/download the summary charts or raw scores, you may do so
            through your browser. This can typically be done by using the
            keyboard shortcut “CRTL+P” when in the <b>SUMMARY SCORES</b> page.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-b-6-content"
          id="panel-b-6-header"
        >
          <Typography variant="h6">
            Can I delete or archive a client after adding them?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No, currently there is no feature to delete or archive a client.
            Please contact the research team if you need to delete a client.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
