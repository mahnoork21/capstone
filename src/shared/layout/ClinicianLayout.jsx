import React, { useState } from "react";
import { useRouter } from "next/router";
import { Toolbar, CssBaseline } from "@mui/material";

import Footer from "../clinician/footer";
import AuthHeader from "../clinician/header/AuthHeader";
import NormalHeader from "../clinician/header/NormalHeader";
import {
  CurvedBackground,
  PageWrapper,
  FlexBox,
  ContentBox,
} from "./clinician-shared";
import ClinicianProviders from "./ClinicianProviders";
import Navbar from "../clinician/navbar";

const ClinicianLayout = ({ window, children }) => {
  const router = useRouter();
  const isAuth = router.pathname === "/clinician/auth";

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((mobileOpen) => !mobileOpen);
  };

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
