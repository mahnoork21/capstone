import React, { useEffect, useState } from "react";
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
        ? daysDiff + " days ago "
        : daysDiff == 1
        ? "Yesterday"
        : "Today ";

    const questionsCount = surveyType.startsWith("Young") ? 23 : 27;
    const percentComplete = Math.ceil(
      (Object.keys(activityResponse).length * 100) / questionsCount
    );

    return daysDiffText + " (" + percentComplete + "% complete)";
  };

  const handleCopyLinkClick = () =>
    navigator.clipboard.writeText(
      `${window.location.host}/client?orgId=${orgId}&clinicianId=${clinicianId}&surveyId=${surveyId}`
    );

  const handleArchiveClick = () => {
    archiveRestoreSurveyById(surveyId);
  };

  const handleViewScoresClick = () => {
    router.push(`/clinician/survey-report/${surveyId}`);
  };

  // const handleEmailClientClick = () => {};

  // const handleSendReminderClick = () => {};

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
          <StyledLink href="#" underline="hover">
            SEND REMINDER
          </StyledLink>
        ) : (
          <StyledLink href="#" underline="hover">
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
