import React, { useState } from "react";
import styles from "../Modal.module.css";

export default function ActivityGuide() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  // if (modal) {
  //   document.body.classList.add(styles["active-modal"]);
  // } else {
  //   document.body.classList.remove(styles["active-modal"]);
  // }
  return (
    <>
      <button onClick={toggleModal} className={styles["btn-modal"]}>
        Activity Guide
      </button>
      {modal && (
        <div className={styles["modal"]}>
          <div onClick={toggleModal} className={styles["overlay"]}></div>
          <div className={styles["modal-content"]}>
            <h2>PUFI-2</h2>
            <img
              src="/images/survey_modal/Activity_Guide.png"
              alt="reference"
            />
            <button className={styles["close-modal"]} onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
