import React, { useState } from "react";
import { useRouter } from "next/router";
import { Toolbar, Box, CssBaseline } from "@mui/material";

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

const drawerWidth = 280;
import ClinicianProvider from "@/context/ClinicianContext";
import { PageWrapper } from "./clinician-shared";
import Header from "../clinician/header/Header";
import { CurvedBackground } from "./clinician-shared";
import { Footer } from "../clinician/footer/Footer";
import { makeStyles } from "@mui/styles";
import { Typography} from "@mui/material";
import styled from "@emotion/styled";

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
const ClinicianLayout = ({ children }) => {
  
  return (
    <>
    <PageWrapper>
    <CurvedBackground />
      <Header/>
      <Typography variant="h5" noWrap sx={{
  display: "flex",
  fontSize: "40px",
  color: "white",
  fontWeight: 500,
  padding: "10px 0px 16px 0px",
  justifyContent: "center",
  alignTtems: "center"
}}>
  <span>PUFI-2</span>
</Typography>

      
        
      {children}
      <Footer/>
    </PageWrapper>
    </>
  );
};

export default ClinicianLayout;
