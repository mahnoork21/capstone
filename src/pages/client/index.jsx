import React from "react";
import styles from "./client.module.css";
import YoutubeEmbed from "@/shared-components/youtubeEmbed/YoutubeEmbed";

const Home = () => {
  return (
    <div className={styles.main}>
      <section className={styles.pros}>
        <h3>Prosthetic Upper Limb Functional Index (PUFI-2)</h3>
        <br />
      </section>
      <section>
        <p>
          The PUFI-2 was designed to help us understand how a child prosthetic
          user performs bilateral activities in different ways, the ease of task
          performance with and without their prosthesis, and the perceived
          usefulness of their prosthesis.
        </p>
      </section>
      <section>
        <p>
          The PUFI-2 questionnaire lets children and parents tell their
          clinicians about the functional use of a prosthetic device at home, at
          school, and in the community.
        </p>
        <YoutubeEmbed embedId="7C8MMd7iiEU" />
        <p>
          The PUFI-2 contains a list of commonly performed daily tasks and for
          each one asks the following questions:
        </p>
      </section>
      <section>
        <ul>
          <li> Is this an activity that you do?</li>
          <li> How do you USUALLY do the activity?</li>
          <li> How well do you do the activity using the prosthesis?</li>
          <li> How useful is the prosthesis for the activity?</li>
          <li> How well do you do the activity without the prosthesis</li>
        </ul>
        <br />
        <p className={styles.paracl}>
          Responses to these questions provide clinicians with meaningful
          information that can be used for prosthetic treatment planning and
          functional and prosthetic training in daily activities. The PUFI-2
          summary scores can be immediately shared with clients, their parents
          and their health care team.
        </p>
      </section>
    </div>
  );
};

export default Home;
