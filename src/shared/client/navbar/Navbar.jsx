import React, { useState, useEffect } from "react";
import SurveyIncomplete from "../surveyIncomplete/surveyIncomplete";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { HeaderButton } from "../header/styled";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ desktop }) {
  const [showDialog, setShowDialog] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  //TODO warning for user

  // const handleNavItemClick = (navItem, event) => {
  //   event.preventDefault();
  //   const currentPath = window.location.pathname;
  //   if (currentPath === "/survey" || currentPath === "/surveyComplete") {
  //     setShowDialog(true);
  //     setRedirectTo(navItem);
  //   } else {
  //     window.location.href = navItem;
  //   }
  // };

  const handleCancel = () => {
    setShowDialog(false);
    setRedirectTo("");
  };

  const handleLeave = () => {
    setShowDialog(false);
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const renderMobile = () => {
  //   if (!desktop) {
  //     return (
  //       <div>
  //         <IconButton
  //           aria-controls="menu"
  //           aria-haspopup="true"
  //           onClick={handleMenuOpen}
  //         >
  //           <MenuIcon sx={{ color: "white" }} />
  //         </IconButton>
  //         <Menu
  //           id="menu"
  //           anchorEl={anchorEl}
  //           open={Boolean(anchorEl)}
  //           onClose={handleMenuClose}
  //         >
  //           <MenuItem onClick={handleMenuClose}>Link 1</MenuItem>
  //           <MenuItem onClick={handleMenuClose}>Link 2</MenuItem>
  //           <MenuItem onClick={handleMenuClose}>Link 3</MenuItem>
  //         </Menu>
  //       </div>
  //     );
  //   }
  // };

  // const handleBeforeUnload = (event) => {
  //   if (showDialog) {
  //     event.preventDefault();
  //     event.returnValue = 'Your progress will be lost. Are you sure you want to leave the survey ?';
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [showDialog]);

  return (
    <>
      {desktop ? (
        <section className={styles.navbar}>
          <Link
            href="/client"
            // onClick={(event) => handleNavItemClick("/", event)}
            className={styles["navbar-item"]}
          >
            Home
          </Link>
          <Link
            href="/client/about"
            // onClick={(event) => handleNavItemClick("/about", event)}
            className={styles["navbar-item"]}
          >
            About
          </Link>

          <Link href="/client/survey" className={styles["navbar-item"]}>
            <HeaderButton variant="outlined">START SURVEY</HeaderButton>
          </Link>
          {showDialog && (
            <SurveyIncomplete
              message=""
              onCancel={handleCancel}
              onLeave={handleLeave}
            />
          )}
        </section>
      ) : (
        <div>
          <IconButton
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href="/client">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/client/about">About</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/client/survey">Start Survey</Link>
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}

export default Navbar;
