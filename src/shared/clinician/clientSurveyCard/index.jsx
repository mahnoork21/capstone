import { useContext, useState } from "react";
import differenceInDays from "date-fns/differenceInDays";
import {
  InsertLink,
  DeleteOutline,
  MoreHorizRounded,
  VisibilityOutlined,
  ContentCopy,
  OpenInNew,
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
import { useSnackbarContext } from "@/context/snackbarContext";
import { ClinicianContext } from "@/context/ClinicianContext";

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
  reloadPageData,
}) => {
  const router = useRouter();
  const { showSnackbar } = useSnackbarContext();

  const { clinicianDetails } = useContext(ClinicianContext);

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

  const emailBody = `Dear [Client Name],

This email is from Clinician ${
    (clinicianDetails?.first_name || "") +
    " " +
    (clinicianDetails?.last_name || "")
  }.

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

`;

  const handleEmailClick = () => {
    const emailSubject =
      (whichCard == "in-progress" ? "Reminder: " : "") +
      "Please complete the PUFI-2 questionnaire";

    window.location.href = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  const handleCopyEmailBodyClick = () =>
    navigator.clipboard.writeText(emailBody);

  const handleOpenPufi2Click = () => window.open(surveyUrl, "_blank").focus();

  const handleCopyPufi2Click = () => navigator.clipboard.writeText(surveyUrl);

  const handleArchiveClick = async () => {
    try {
      await archiveRestoreSurveyById(orgId, clinicianId, surveyId);
    } catch (err) {
      showSnackbar("error", err.message);
      console.error(err);
    }

    await reloadPageData();
  };

  const handleViewScoresClick = () => {
    router.push(`/clinician/survey-report/${surveyId}`);
  };

  const menuItems =
    whichCard == "completed"
      ? [
          {
            icon: <OpenInNew />,
            text: "OPEN PUFI-2",
            clickHandlerFn: handleOpenPufi2Click,
          },
          {
            icon: <InsertLink />,
            text: "COPY PUFI-2 LINK",
            clickHandlerFn: handleCopyPufi2Click,
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
            icon: <OpenInNew />,
            text: "OPEN PUFI-2",
            clickHandlerFn: handleOpenPufi2Click,
          },
          {
            icon: <InsertLink />,
            text: "COPY PUFI-2 LINK",
            clickHandlerFn: handleCopyPufi2Click,
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
            icon: <OpenInNew />,
            text: "OPEN PUFI-2",
            clickHandlerFn: handleOpenPufi2Click,
          },
          {
            icon: <InsertLink />,
            text: "COPY PUFI-2 LINK",
            clickHandlerFn: handleCopyPufi2Click,
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
          <MenuItem
            key={text}
            onClick={() => {
              handleMenuClose();
              clickHandlerFn();
            }}
          >
            <StyledListItemIcon>{icon}</StyledListItemIcon>
            <StyledLink underline="none">{text}</StyledLink>
          </MenuItem>
        ))}
      </Menu>
    </StyledCard>
  );
};

export default ClientSurveyCard;
