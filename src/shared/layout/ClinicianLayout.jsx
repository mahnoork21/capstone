import ClinicianProvider from "@/context/ClinicianContext";
import { PageWrapper } from "./clinician-shared";
import Header from "../clinician/header/Header";
import { CurvedBackground } from "./clinician-shared";
import { Footer } from "../clinician/footer/Footer";
import { makeStyles } from "@mui/styles";
import { Typography} from "@mui/material";
import styled from "@emotion/styled";

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
