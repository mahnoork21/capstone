import React, { useState } from "react";
import "../Modal.css";

export default function DifficultyScale() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Difficulty Scale
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>PUFI-2</h2>
            <img src="/images/survey_modal/Difficulty_Scale.png" alt="reference" />
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
