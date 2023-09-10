import Card from "../client/card/Card";
import Footer from "../client/footer/Footer";
import Header from "../client/header/Header";
import styles from "./Client.module.css";

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
