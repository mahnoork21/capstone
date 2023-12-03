import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  HomeOutlined,
  AccountBoxOutlined,
  BallotOutlined,
  Logout,
} from "@mui/icons-material";
import {
  LogOutBtn,
  SpecialHighlightedListItemBtn,
  NavbarBox,
  MobileDrawer,
  DesktopDrawer,
  StyledClinicianName,
  MainAccountBox,
  StyledAccountSvgIcon,
  InnerAccountDetailsBox,
  StyledViewProfileLink,
} from "./styled";

const listItemsArray = [
  { IconType: HomeOutlined, text: "Dashboard" },
  { IconType: AccountBoxOutlined, text: "My Clients" },
  { IconType: BallotOutlined, text: "All Surveys" },
];

export default function Navbar({ window, mobileOpen, handleDrawerToggle }) {
  const router = useRouter();

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
    handleDrawerToggle();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("orgId");
    localStorage.removeItem("clinicianId");

    router.push("/clinician/login");
  };

  const Content = () => (
    <Box>
      <Toolbar />
      <MainAccountBox>
        <StyledAccountSvgIcon>
          <svg
            width="73px"
            height="73px"
            viewBox="0 0 73 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0833 60.2083C15.9028 57.7083 19.7222 55.7465 23.5417 54.3229C27.3611 52.8993 31.5972 52.1875 36.25 52.1875C40.9028 52.1875 45.1389 52.8993 48.9583 54.3229C52.7778 55.7465 56.5972 57.7083 60.4167 60.2083C63.4028 57.0833 65.7812 53.5069 67.5521 49.4792C69.3229 45.4514 70.2083 41.0417 70.2083 36.25C70.2083 26.8056 66.9097 18.7847 60.3125 12.1875C53.7153 5.59028 45.6944 2.29167 36.25 2.29167C26.8056 2.29167 18.7847 5.59028 12.1875 12.1875C5.59028 18.7847 2.29167 26.8056 2.29167 36.25C2.29167 41.0417 3.17708 45.4514 4.94792 49.4792C6.71875 53.5069 9.09722 57.0833 12.0833 60.2083ZM36.2306 37.3958C32.9102 37.3958 30.1215 36.2609 27.8646 33.991C25.6076 31.7212 24.4792 28.926 24.4792 25.6056C24.4792 22.2852 25.6141 19.4965 27.884 17.2396C30.1538 14.9826 32.949 13.8542 36.2694 13.8542C39.5898 13.8542 42.3785 14.9891 44.6354 17.259C46.8924 19.5288 48.0208 22.324 48.0208 25.6444C48.0208 28.9648 46.8859 31.7535 44.616 34.0104C42.3462 36.2674 39.551 37.3958 36.2306 37.3958ZM36.2078 72.5C31.1977 72.5 26.4833 71.5625 22.0646 69.6875C17.6459 67.8125 13.8013 65.2257 10.5307 61.9271C7.26024 58.6285 4.6875 54.7972 2.8125 50.4332C0.9375 46.0693 0 41.3242 0 36.1979C0 31.141 0.9375 26.4133 2.8125 22.0147C4.6875 17.616 7.27431 13.7847 10.5729 10.5208C13.8715 7.25694 17.7028 4.6875 22.0668 2.8125C26.4307 0.9375 31.1758 0 36.3021 0C41.359 0 46.0867 0.9375 50.4853 2.8125C54.884 4.6875 58.7153 7.25694 61.9792 10.5208C65.2431 13.7847 67.8125 17.6215 69.6875 22.0312C71.5625 26.441 72.5 31.1713 72.5 36.2223C72.5 41.3427 71.5625 46.0823 69.6875 50.441C67.8125 54.7998 65.2431 58.6285 61.9792 61.9271C58.7153 65.2257 54.874 67.8125 50.4553 69.6875C46.0366 71.5625 41.2875 72.5 36.2078 72.5Z"
              fill="#555555"
            />
          </svg>
        </StyledAccountSvgIcon>
        <InnerAccountDetailsBox>
          <StyledClinicianName>Clinician Name</StyledClinicianName>
          <StyledViewProfileLink>View Profile</StyledViewProfileLink>
        </InnerAccountDetailsBox>
      </MainAccountBox>
      <List>
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
          <LogOutBtn variant="outlined" onClick={handleLogoutClick}>
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
