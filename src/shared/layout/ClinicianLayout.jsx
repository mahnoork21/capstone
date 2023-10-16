import ClinicianProvider from "@/context/ClinicianContext";
import { PageWrapper } from "./clinician-shared";
import Header from "../clinician/header/Header";
import { CurvedBackground } from "./clinician-shared";
import { Footer } from "../clinician/footer/Footer";
import { makeStyles } from "@mui/styles";
import { Typography} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ClinicianLayout = ({ children }) => {
  
  return (
    <>
    <PageWrapper>
    <CurvedBackground />
      <Header/>
      <Typography variant="h5" noWrap component="div">
          PUFI-2
        </Typography>
        
      {children}
      <Footer/>
    </PageWrapper>
    </>
  );
};

export default ClinicianLayout;
