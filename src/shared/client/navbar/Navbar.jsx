import React, { useState, useEffect } from "react";
import SurveyIncomplete from "../surveyIncomplete/surveyIncomplete";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { HeaderButton } from "../header/styled";

function Navbar() {
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
  );
}

export default Navbar;
