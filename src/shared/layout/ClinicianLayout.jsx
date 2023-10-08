import React, { useState } from "react";
import { useRouter } from "next/router";
import { Toolbar, Box, CssBaseline } from "@mui/material";

import Footer from "../clinician/footer";
import AuthHeader from "../clinician/header/AuthHeader";
import NormalHeader from "../clinician/header/NormalHeader";
import { CurvedBackground, PageWrapper } from "./clinician-shared";
import ClinicianProviders from "./ClinicianProviders";
import Navbar from "../clinician/navbar";

const drawerWidth = 280;

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
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <NormalHeader handleDrawerToggle={handleDrawerToggle} />

          <Navbar
            window={window}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
          />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { lg: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      )}
    </ClinicianProviders>
  );
};

export default ClinicianLayout;
