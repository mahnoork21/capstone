import React, { useState } from "react";
import differenceInDays from "date-fns/differenceInDays";
import {
  ContentCopy,
  DeleteOutline,
  MoreHorizRounded,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  StyledCard,
  StyledCardActions,
  StyledCardContent,
  StyledIconButton,
  StyledLink,
  StyledListItemIcon,
  StyledTypography1,
  StyledTypography2,
} from "./styled";
import { Menu, MenuItem } from "@mui/material";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import { archiveRestoreSurveyById } from "@/firebase/clinicianRepo";
import { useRouter } from "next/router";

// TODO: implement email link

const ClientSurveyCard = ({
  surveyId,
  surveyType,
  clientId,
  clinicianId,
  orgId,
  createdDate,
  updatedDate,
  submittedDate,
  isSubmitted,
  activityResponse,
  isArchived,
}) => {
  const router = useRouter();

  let surveyUrl = `${window.location.host}/client?orgId=${orgId}&clinicianId=${clinicianId}&surveyId=${surveyId}`;
  if (!surveyUrl.startsWith("http")) {
    surveyUrl = "http://" + surveyUrl;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const whichCard = isSubmitted
    ? "completed"
    : updatedDate
    ? "in-progress"
    : "pending";

  const inProgressText = () => {
    const daysDiff = differenceInDays(new Date(), updatedDate.toDate());
    const daysDiffText =
      daysDiff > 1
        ? daysDiff + " days ago"
        : daysDiff == 1
        ? "Yesterday"
        : "Today";

    const questionsCount = surveyType.startsWith("Young") ? 23 : 27;
    const percentComplete = Math.ceil(
      (Object.keys(activityResponse).length * 100) / questionsCount
    );

    return daysDiffText + " (" + percentComplete + "% complete)";
  };

  // Written using bold font: 𝐏𝐫𝐨𝐬𝐭𝐡𝐞𝐭𝐢𝐜 𝐔𝐩𝐩𝐞𝐫 𝐋𝐢𝐦𝐛 𝐅𝐮𝐧𝐜𝐭𝐢𝐨𝐧𝐚𝐥 𝐈𝐧𝐝𝐞𝐱
  const emailBody = `Dear [Client Name],


${
  whichCard == "in-progress"
    ? `This is a reminder email to complete the Prosthetic Upper Limb Functional Index (PUFI-2). You had last updated this survey ${inProgressText()}. The link is given below.`
    : "Your link to complete the Prosthetic Upper Limb Functional Index (PUFI-2) is below. Please watch the PUFI-2 introduction video at the following link prior to completing the questionnaire."
}


This link is unique to your client ID, and should not be shared with others. If you stop or close the questionnaire after starting, your responses will be saved, and you may resume at a later point by visiting this link again.


  PUFI-2 ${
    surveyType.startsWith("Young") ? "Parent" : "Older Child"
  } Questionnaire Link [${surveyUrl}]


Once you submit the completed questionnaire, I will review your results and will share them with you at your next appointment.


Please contact me if you have any questions or concerns.


Thank you,


Confidentiality Notice:
E-mail may be intercepted between the sender and the receiver and is
therefore neither secure nor confidential. Your continued use of e-mail
communication confirms that you accept this risk. If this is an urgent
matter, please contact me at the phone number provided. This e-mail,
including any attachments, is for the sole use of the intended recipient(s)
and may contain private, confidential, and privileged information. Any
unauthorized review, use, disclosure or distribution is prohibited. If you
are not the intended recipient or this information has been
inappropriately forwarded to you, please contact the sender by reply
e-mail and destroy all copies of the original.
  `;

  const handleEmailClick = () => {
    const emailSubject = "Please complete the PUFI-2 questionnaire";

    window.location.href = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  const handleCopyEmailBodyClick = () =>
    navigator.clipboard.writeText(emailBody);

  const handleCopyLinkClick = () => navigator.clipboard.writeText(surveyUrl);

  const handleArchiveClick = () => {
    archiveRestoreSurveyById(surveyId);
  };

  const handleViewScoresClick = () => {
    router.push(`/clinician/survey-report/${surveyId}`);
  };

  const menuItems =
    whichCard == "completed"
      ? [
          {
            icon: <ContentCopy />,
            text: "COPY LINK",
            clickHandlerFn: handleCopyLinkClick,
          },
          {
            icon: isArchived ? (
              <RestoreFromTrashOutlinedIcon />
            ) : (
              <DeleteOutline />
            ),
            text: isArchived ? "RESTORE" : "ARCHIVE",
            clickHandlerFn: handleArchiveClick,
          },
        ]
      : whichCard == "in-progress"
      ? [
          {
            icon: <ContentCopy />,
            text: "COPY LINK",
            clickHandlerFn: handleCopyLinkClick,
          },
          {
            icon: <ContentCopy />,
            text: "COPY EMAIL BODY",
            clickHandlerFn: handleCopyEmailBodyClick,
          },
          {
            icon: <VisibilityOutlined />,
            text: "VIEW SCORES",
            clickHandlerFn: handleViewScoresClick,
          },
          {
            icon: isArchived ? (
              <RestoreFromTrashOutlinedIcon />
            ) : (
              <DeleteOutline />
            ),
            text: isArchived ? "RESTORE" : "ARCHIVE",
            clickHandlerFn: handleArchiveClick,
          },
        ]
      : [
          {
            icon: <ContentCopy />,
            text: "COPY LINK",
            clickHandlerFn: handleCopyLinkClick,
          },
          {
            icon: <ContentCopy />,
            text: "COPY EMAIL BODY",
            clickHandlerFn: handleCopyEmailBodyClick,
          },
          {
            icon: isArchived ? (
              <RestoreFromTrashOutlinedIcon />
            ) : (
              <DeleteOutline />
            ),
            text: isArchived ? "RESTORE" : "ARCHIVE",
            clickHandlerFn: handleArchiveClick,
          },
        ];

  return (
    <StyledCard
      top-color={
        whichCard == "completed"
          ? "var(--pufi-primary-light, #53BB50)"
          : whichCard == "in-progress"
          ? "#FCAF17"
          : "#E9501E"
      }
    >
      <StyledCardContent>
        <StyledTypography1>Client ID:</StyledTypography1>
        <StyledTypography2>{clientId}</StyledTypography2>
        <StyledTypography1>Survey ID:</StyledTypography1>
        <StyledTypography2>{surveyId}</StyledTypography2>
        <StyledTypography1>Type:</StyledTypography1>
        <StyledTypography2>{surveyType}</StyledTypography2>
        <StyledTypography1>
          {whichCard == "completed"
            ? "Completed:"
            : whichCard == "in-progress"
            ? "Last Updated:"
            : "Created:"}
        </StyledTypography1>
        <StyledTypography2>
          {whichCard == "completed"
            ? submittedDate.toDate().toDateString()
            : whichCard == "in-progress"
            ? inProgressText()
            : createdDate.toDate().toDateString()}
        </StyledTypography2>
      </StyledCardContent>
      <StyledCardActions>
        {whichCard == "completed" ? (
          <StyledLink
            href="#"
            underline="hover"
            onClick={handleViewScoresClick}
          >
            VIEW SCORES
          </StyledLink>
        ) : whichCard == "in-progress" ? (
          <StyledLink href="#" underline="hover" onClick={handleEmailClick}>
            SEND REMINDER
          </StyledLink>
        ) : (
          <StyledLink href="#" underline="hover" onClick={handleEmailClick}>
            EMAIL CLIENT
          </StyledLink>
        )}

        <StyledIconButton
          aria-controls={isMenuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? "true" : undefined}
          onClick={handleMenuClick}
        >
          <MoreHorizRounded />
        </StyledIconButton>
      </StyledCardActions>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        aria-labelledby="basic-button"
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuItems.map(({ icon, text, clickHandlerFn }) => (
          <MenuItem key={text} onClick={handleMenuClose}>
            <StyledListItemIcon>{icon}</StyledListItemIcon>
            <StyledLink underline="none" onClick={clickHandlerFn}>
              {text}
            </StyledLink>
          </MenuItem>
        ))}
      </Menu>
    </StyledCard>
  );
};

export default ClientSurveyCard;
