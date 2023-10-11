import React, { useState, useEffect, useContext } from "react";
import SurveyIncomplete from "../surveyIncomplete/surveyIncomplete";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { HeaderButton } from "../header/styled";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { ClientContext } from "@/context/ClientContext";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import { useRouter } from "next/router";

function Navbar() {
  const [showDialog, setShowDialog] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  const { breakpoint, headerButtonType } = useContext(ClientContext);

  const router = useRouter();

  const handleOnClick = () => {
    if (headerButtonType === HeaderButtonType.START_SURVEY) {
      router.push("/client/survey");
    } else {
      //TODO save survey
    }
  };

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

  return (
    <>
      {breakpoint === "desktop" ? (
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

          {/* <Link href="/client/survey" className={styles["navbar-item"]}>
            <HeaderButton variant="outlined">START SURVEY</HeaderButton>
          </Link> */}
          <HeaderButton
            variant="outlined"
            onClick={handleOnClick}
            className={styles["navbar-item"]}
          >
            {headerButtonType === HeaderButtonType.SAVE_AND_EXIT
              ? "SAVE AND EXIT"
              : "START SURVEY"}
          </HeaderButton>
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
          <Image
            src="/icons/menu.svg"
            width={32}
            height={32}
            onClick={handleMenuOpen}
          />
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link className={styles["menu-item-link"]} href="/client">
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link className={styles["menu-item-link"]} href="/client/about">
                About
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link className={styles["menu-item-link"]} href="/client/survey">
                Start Survey
              </Link>
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}

export default Navbar;
