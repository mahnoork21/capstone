import React, { useState, useContext } from "react";
import Image from "next/image";
import { ClinicianContext } from "@/context/ClinicianContext";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  HomeOutlined,
  AccountBoxOutlined,
  BallotOutlined,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import {
  LogOutBtn,
  MobileNavContainer,
  SpecialHighlightedListItemBtn,
} from "./styled";
import { Toolbar } from "@mui/material";

function Navbar() {
  const { breakpoint } = useContext(ClinicianContext);

  const [state, setState] = useState({
    top: false,
  });

  // For selection of List Item
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const listItemsArray = [
    { IconType: HomeOutlined, text: "Dashboard" },
    { IconType: AccountBoxOutlined, text: "My Clients" },
    { IconType: BallotOutlined, text: "All Surveys" },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: "100%", maxWidth: 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Clinician Name" secondary="View Profile" />
        </ListItem>

        {listItemsArray.map(({ IconType, text }, index) => (
          <ListItem key={text} disablePadding>
            <SpecialHighlightedListItemBtn
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <IconType />
              </ListItemIcon>
              <ListItemText primary={text} />
            </SpecialHighlightedListItemBtn>
          </ListItem>
        ))}

        <ListItem>
          <LogOutBtn variant="outlined">
            <Logout /> LOG OUT
          </LogOutBtn>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {breakpoint === "desktop" ? (
        <div>
          <Drawer
            variant="permanent"
            sx={{
              width: 280,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 280,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            {list("left")}
          </Drawer>
        </div>
      ) : (
        <MobileNavContainer>
          <Image
            src="/icons/menu.svg"
            width={32}
            height={32}
            onClick={toggleDrawer("left", true)}
          />

          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </MobileNavContainer>
      )}
    </>
  );
}

export default Navbar;
