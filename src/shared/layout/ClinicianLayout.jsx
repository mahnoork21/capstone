import React, { useState } from "react";
import {
  ContentBox,
  CurvedBackground,
  FlexBox,
  PageWrapper,
} from "./clinician-shared";
const drawerWidth = 280;
import NormalHeader from "../clinician/header/NormalHeader";
import { Footer } from "../clinician/footer/Footer";
import { CssBaseline, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ClinicianProviders from "./ClinicianProviders";
import Navbar from "../clinician/navbar";
import AuthHeader from "../clinician/header/AuthHeader";

const ClinicianLayout = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((mobileOpen) => !mobileOpen);
  };

  const router = useRouter();
  const isAuth =
    router.pathname === "/clinician/login" ||
    router.pathname === "/clinician/register";

  return (
    <ClinicianProviders>
      {isAuth ? (
        <PageWrapper>
          <CurvedBackground />
          <AuthHeader />
          {children}
          <Footer />
        </PageWrapper>
      ) : (
        <FlexBox>
          <CssBaseline />

          <NormalHeader handleDrawerToggle={handleDrawerToggle} />

          <Navbar
            window={window}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
          />

          <ContentBox component="main">
            <Toolbar />
            {children}
          </ContentBox>
        </FlexBox>
      )}
    </ClinicianProviders>
  );
};

export default ClinicianLayout;
