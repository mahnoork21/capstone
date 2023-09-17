import Card from "../client/card/Card";
import Footer from "../client/footer/Footer";
import Header from "../client/header/Header";
import styles from "./Client.module.css";

const ClientLayout = ({ children }) => {
  return (
    <Card>
      <Header />
      {children}
      <Footer />
    </Card>
  );
};

export default ClientLayout;
