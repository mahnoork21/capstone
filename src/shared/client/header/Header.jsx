import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <section className={styles.header}>
      <section className={styles["header-top"]}>
        <section className={styles["header-top__logo"]}>
          <a href="/client" className={styles["header-logo"]}>
            <i>
              <strong>PUFI-2</strong>
            </i>
          </a>
        </section>
        <section className={styles["header-top__navbar"]}>
          <section className={styles["header-top__navigation"]}>
            <Navbar />
          </section>
          <hr className={styles["header-top__seperator"]} />
        </section>
      </section>
    </section>
  );
};

export default Header;
