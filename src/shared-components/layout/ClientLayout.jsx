import Card from "../card/Card";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./client.module.css";

const ClientLayout = ({ children }) => {
  return (
    <Card>
      <Header />
      {children}
      {/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/surveyComplete" element={<SurveyComplete />} />
    </Routes> */}
      <Footer />
    </Card>
  );
};

export default ClientLayout;
