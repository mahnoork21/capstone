import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { StyledTypography } from "./styled";
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
            bimanual daily activities in children using prostheses. One main
            goal for the PUFI is to measure change in status over time. The
            PUFI-2 is not a medical device. The PUFI-2 is intended to only be
            used by health care practitioners as part of their care practice.
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
            The PUFI-2 is used for children with upper limb prosthesis. There
            are two versions: The young child version - ages 3 to 6 years The
            older child version - ages 7 and up The assessment can be taken by
            the child and/or their parent/caregiver.
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
            After creating an account, health care practitioner&#39;s request
            the completion of the PUFI-2 via email, and children and/or parents
            complete the assessment on their own. Once complete, health care
            practitioner&#39;s can view raw scores and summary charts for use
            either in an associated research project or in clinical use for
            sharing and discussing the results with the child/parent and using
            within the child&#39;s clinical record.
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
            Reasons for completing the PUFI-2 questionnaire may include, but are
            not limited to: First time prosthetic user After client receives new
            prosthetic device(s) or any changes/adjustments to their prosthetic
            device(s) or treatment plan Monitoring prosthetic and functional
            needs over time (e.g. 3 month, 6 months, 12 months check-in). Each
            clinic/health care practitioner will determine when to re-administer
            the PUFI-2 based on their client&#39;s needs and practice setting.
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
            Bloorview Kids Rehab Hospital by Dr. Virginia Wright and her team.
            The PUFI has since been updated with co-creation involvement by
            children and clinicians. <br />
            <br />
            <strong>Publications:</strong> <br />
            <br />
            Wright FV, Hubbard S, Jutai J, Naumann S. The Prosthetic Upper
            Extremity Functional Index: development and reliability testing of a
            new functional status questionnaire for children who use upper
            extremity prostheses.{" "}
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/11382260/"
              target="_blank"
              rel="noreferrer noopener"
            >
              View Publication
            </a>
            <br />
            <br />
            Wright FV, Hubbard S, Naumann S, Jutai J. Evaluation of the validity
            of the prosthetic upper extremity functional index for children.
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/12690590/"
              target="_blank"
              rel="noreferrer noopener"
            >
              View Publication
            </a>
          </StyledTypography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default AccordionCard;
