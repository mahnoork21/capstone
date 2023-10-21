import React, { useState } from "react";
import { CurvedBackground, PageWrapper } from "./clinician-shared";
const drawerWidth = 280;
import NormalHeader from "../clinician/header/NormalHeader";
import { Footer } from "../clinician/footer/Footer";
import { Typography } from "@mui/material";

const ClinicianLayout = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((mobileOpen) => !mobileOpen);
  };

  return (
    <>
      <PageWrapper>
        <CurvedBackground />
        <NormalHeader handleDrawerToggle={handleDrawerToggle} />
        <Typography
          variant="h5"
          noWrap
          sx={{
            display: "flex",
            fontSize: "40px",
            color: "white",
            fontWeight: 500,
            // padding: "10px 0px 0px 0px",
            justifyContent: "center",
            alignTtems: "center",
          }}
        >
          <span>PUFI-2</span>
        </Typography>
        {children}
        <Footer />
      </PageWrapper>
    </>
  );
};

export default ClinicianLayout;

// const ClinicianLayout = ({ window, children }) => {
//   const router = useRouter();
//   const isAuth = router.pathname === "/clinician/auth";

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const handleDrawerToggle = () => {
//     setMobileOpen((mobileOpen) => !mobileOpen);
//   };

//   return (
//     <ClinicianProviders>
//       {isAuth ? (
//         <PageWrapper>
//           <CurvedBackground />
//           <AuthHeader />
//           {children}
//           <Footer />
//         </PageWrapper>
//       ) : (
//         <FlexBox>
//           <CssBaseline />

//           <NormalHeader handleDrawerToggle={handleDrawerToggle} />

//           <Navbar
//             window={window}
//             mobileOpen={mobileOpen}
//             handleDrawerToggle={handleDrawerToggle}
//             drawerWidth={drawerWidth}
//           />

//           <ContentBox component="main">
//             <Toolbar />
//             {children}
//           </ContentBox>
//         </FlexBox>
//       )}
//     </ClinicianProviders>
//   );
