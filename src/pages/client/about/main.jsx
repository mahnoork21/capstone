import React from "react";

import ActivityGuide from "@/shared/client/modal/activityGuide/ActivityGuide";
import DifficultyScale from "@/shared/client/modal/difficultyScale/DifficultyScale";
import ChildGlossary from "@/shared/client/modal/childGlossary/ChildGlossary";
import styles from "./styles.module.css";

const About = () => {
  return (
    <div className={styles.About}>
      <section>
        <h2>About the PUFI-2</h2>
      </section>
      <section className={styles["section-a"]}>
        <p className={styles.redpad}>
          <b>The Prosthetic Upper Limb Functional Index </b>(PUFI-2) is a child-
          and parent-report questionnaire that evaluates real-world prosthesis
          use in a range of bimanual daily activities in children using
          prostheses
        </p>
        <br />
        <p className={styles.redpad}>
          <b>PUFI-2 Versions :</b> There are three versions of the assessment
          worded so they are appropriate to the viewpoint of the child or
          parent. The Young Child and Older Child versions contain different
          activities from each other so that they are developmentally
          appropriate. The versions are:
        </p>
        <br />
        <ol>
          <li className={styles.listpad}>
            <b>
              <i>Young Child Version:</i>
            </b>
            Applies to a young child from 3 to 6 years of age, inclusive. It
            should be completed by the parent only
          </li>
          <li className={styles.listpad}>
            <b>
              <i>Older Child Version </i>
            </b>
            - Self-Report*: applies to children 7 years of age and older and is
            completed by the child if they are able to do so
          </li>
          <li className={styles.listpad}>
            <b>
              <i>Older Child Version </i>
            </b>
            - Parent-Report*: applies to children 7 years of age and older and
            is completed by the parent.
          </li>
        </ol>
        <br />
        <p className={styles.redmarg}>
          *If both parent and child are available to complete the PUFI-2, both
          are asked to do so to provide different perspectives/contexts.
        </p>
        <p>
          Response Guide: The following guides provide more description on how
          to respond to the assessment questions. They can also be found within
          the assessment.{" "}
        </p>
        <div className={styles["modal-layout"]}>
          <ActivityGuide className={styles["modal-style"]} />
          <DifficultyScale className={styles["modal-style"]} />
          <ChildGlossary className={styles["modal-style"]} />
        </div>
      </section>
      <br />
    </div>
  );
};

export default About;
