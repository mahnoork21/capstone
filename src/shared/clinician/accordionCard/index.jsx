import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { StyledTypography, StyledList } from "./styled";
import Link from "next/link";

const AccordionCard = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowForwardIosIcon />}
          id="panel1-header"
        >
          <StyledTypography>
            <b>What is PUFI-2?</b>
          </StyledTypography>
        </AccordionSummary>
        <AccordionDetails>
          <StyledTypography>
            The Prosthetic Upper Extremity Functional Index (PUFI) is a child-
            and parent-report questionnaire administered by a health care
            practitioner that evaluates real-world prosthesis use in a range of
            bi-manual daily activities in children using prostheses. One main
            goal for the PUFI is to measure change in status over time. The
            PUFI-2 is not a medical device. The PUFI-2 is intended to be used by
            health care practitioners as part of their care practice.
          </StyledTypography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowForwardIosIcon />}
          id="panel2-header"
        >
          <StyledTypography>
            <b>Who is the PUFI-2 used for?</b>
          </StyledTypography>
        </AccordionSummary>
        <AccordionDetails>
          <StyledTypography>
            The PUFI-2 is used for children with an upper limb prosthesis. There
            are two versions: the young child version (ages 3 to 6 years) and
            the older child version (ages 7 and up).
          </StyledTypography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowForwardIosIcon />}
          id="panel3-header"
        >
          <StyledTypography>
            <b>What is the assessment process?</b>
          </StyledTypography>
        </AccordionSummary>
        <AccordionDetails>
          <StyledTypography>
            After creating an account, health care practitioners request the
            completion of the PUFI-2 via email, and children and/or parents
            complete the assessment on their own. The results from the PUFI-2
            can help clinicians work collaboratively with clients to inform goal
            setting and treatment planning.
          </StyledTypography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowForwardIosIcon />}
          id="panel4-header"
        >
          <StyledTypography>
            <b>When should the PUFI-2 be administered?</b>
          </StyledTypography>
        </AccordionSummary>
        <AccordionDetails>
          <StyledTypography>
            Each clinic/health care practitioner can determine when to
            administer the PUFI-2 based on their client &#39;s needs and
            practice setting. Some examples of when to administer the PUFI-2 are
            listed below:
          </StyledTypography>
          <br />
          <StyledTypography>
            <Box ml={2}>
              <ul>
                <StyledList>First time prosthetic user</StyledList>
                <StyledList>
                  After client receives new prosthetic device(s) or any
                  changes/adjustments to their prosthetic device(s) or treatment
                  plan
                </StyledList>

                <StyledList>
                  Monitoring prosthetic and functional needs over time
                </StyledList>
              </ul>
            </Box>
          </StyledTypography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowForwardIosIcon />}
          id="panel5-header"
        >
          <StyledTypography>
            <b>Background and Research Involvement</b>
          </StyledTypography>
        </AccordionSummary>
        <AccordionDetails>
          <StyledTypography>
            The PUFI was created and validated over 25 years ago at Holland
            Bloorview Kids Rehabilitation Hospital by Dr. Virginia Wright and
            her team. The PUFI has since been updated with co-creation
            involvement by children and clinicians.
          </StyledTypography>
          <br />
          <StyledTypography>Publications:</StyledTypography>
          <br />
          <StyledTypography>
            Wright FV, Hubbard S, Jutai J, Naumann S. The Prosthetic Upper
            Extremity Functional Index: development and reliability testing of a
            new functional status questionnaire for children who use upper
            extremity prostheses.
            <Link href={"https://pubmed.ncbi.nlm.nih.gov/11382260/"}>
              <StyledTypography>
                https://pubmed.ncbi.nlm.nih.gov/11382260/
              </StyledTypography>
            </Link>
            /
          </StyledTypography>
          <br />
          <StyledTypography>
            Wright FV, Hubbard S, Naumann S, Jutai J. Evaluation of the validity
            of the prosthetic upper extremity functional index for children.
            <Link href={"https://pubmed.ncbi.nlm.nih.gov/12690590/"}>
              <StyledTypography>
                https://pubmed.ncbi.nlm.nih.gov/12690590/
              </StyledTypography>{" "}
            </Link>
          </StyledTypography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default AccordionCard;
