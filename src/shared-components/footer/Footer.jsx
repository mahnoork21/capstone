import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <section className={styles["footer-info"]}>
        <section className={styles["footer-info-center"]}>
          <span className={styles.tnc}> Terms and Conditions </span>
          <span className={styles.bri}>
            Holland Bloorview Kids Rehabilitation Hospital © 2023{" "}
          </span>
        </section>
      </section>
    </section>
  );
};

export default Footer;
