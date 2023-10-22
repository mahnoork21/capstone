import React, { useState, useContext, useEffect } from "react";
import { ClinicianContext } from "@/context/ClinicianContext";
import { useRouter } from "next/router";

import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  HomeOutlined,
  AccountBoxOutlined,
  BallotOutlined,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import {
  LogOutBtn,
  SpecialHighlightedListItemBtn,
  NavbarBox,
  MobileDrawer,
  DesktopDrawer,
} from "./styled";

const listItemsArray = [
  { IconType: HomeOutlined, text: "Dashboard" },
  { IconType: AccountBoxOutlined, text: "My Clients" },
  { IconType: BallotOutlined, text: "All Surveys" },
];

export default function Navbar({
  window,
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}) {
  const router = useRouter();
  const { breakpoint } = useContext(ClinicianContext);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // For selection of List Item
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    const currentDrawerIndex = router.pathname.startsWith(
      "/clinician/dashboard"
    )
      ? 0
      : router.pathname.startsWith("/clinician/my-clients")
      ? 1
      : router.pathname.startsWith("/clinician/all-survey")
      ? 2
      : null;
    setSelectedIndex(currentDrawerIndex);
  }, [router.pathname]);

  const handleListItemClick = (event, index, text) => {
    setSelectedIndex(index);
    router.push("/clinician/" + text.toLowerCase().trim().replace(" ", "-"));
  };

  const Content = () => (
    <Box>
      <Toolbar />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Clinician Name" secondary="View Profile" />
          {/* <ListItemText primary="Clinician Name" /> */}
        </ListItem>

        {listItemsArray.map(({ IconType, text }, index) => (
          <ListItem key={text} disablePadding>
            <SpecialHighlightedListItemBtn
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, text)}
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
      <NavbarBox component="nav" aria-label="mailbox folders">
        <MobileDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {Content()}
        </MobileDrawer>
        <DesktopDrawer variant="permanent" open>
          {Content()}
        </DesktopDrawer>
      </NavbarBox>
    </>
  );
}
