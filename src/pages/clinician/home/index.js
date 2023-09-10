import { React } from "react";

import { Header } from "@/shared/clinician/header/Header";
import { aboutNavbarItems } from "@/utils";

const ClinicianHome = () => {
  return (
    <>
      <Header text="PUFI-2" navbarItems={aboutNavbarItems} />
      <div className="pufi-header bg-g-c-w">
        <p className="heading-text m-0">
          <b>The Prosthetic Upper Limb Function Index &#40;PUFI-2&#41;</b>
        </p>
        <p className="m-0 m-text mt-12">
          Learn about the PUFI-2, how it was developed, and how it can be used.
        </p>
      </div>

      {/* Page Content */}
      <div className="doc-about-content-wrapper">
        <div className="evaluate-ready-wrapper">
          <div className="evaluate">
            <p className="evaluate-heading s-heading-text m-0">
              <b>
                Evaluate real-world prosthesis use in a range of bi-manual daily
                activities
              </b>
            </p>
            <div className="evaluate-text m-text">
              For each of the PUFI&#39;s bimanual items &#40;e.g. tying
              shoelaces, holding bike handles while riding&#41;, multiple choice
              response options evaluate:
              <ol type="a">
                <li>Actual use</li>
                <li>Usual method of performance</li>
                <li>Ease of performance with or without prosthesis</li>
                <li>Usefulness of prosthesis</li>
              </ol>
            </div>
          </div>
          <div className="ready ta-c">
            <p className="s-heading-text m-0">
              <b>Ready to get started?</b>
            </p>
            <p className="s-heading-text m-0 bg-g-c-w health-care-box">
              <b>Health care practitioners can create an account here.</b>
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="ques-ans-wrapper">
          <div className="ques-wrapper">
            <div className="ques">
              <p className="s-heading-text m-0">
                <b>What is the PUFI-2?</b>
              </p>
            </div>
            <div className="ans">
              <p className="m-text m-0">
                The Prosthetic Upper Extremity Functional Index &#40;PUFI&#41;
                is a child- and parent-report questionnaire administered by a
                health care practitioner that evaluates real-world prosthesis
                use in a range of bimanual daily activities in children using
                prostheses. One main goal for the PUFI is to measure change in
                status over time.
              </p>
              <p className="m-text m-0">
                The PUFI-2 is not a medical device. The PUFI-2 is intended to
                only be used by health care practitioners as part of their care
                practice.
              </p>
            </div>
          </div>

          <div className="ques-wrapper">
            <div className="ques">
              <p className="s-heading-text m-0">
                <b>Who is the PUFI-2 used for?</b>
              </p>
            </div>
            <div className="ans">
              <div className="m-text m-0">
                The PUFI-2 is used for children with upper limb prosthesis.
                There are two versions:
                <ol>
                  <li>The young child version - ages 3 to 6 years</li>
                  <li>The older child version - ages 7 and up</li>
                </ol>
              </div>
              <p className="m-text m-0">
                The assessment can be taken by the child and/or their
                parent/caregiver.
              </p>
            </div>
          </div>

          <div className="ques-wrapper">
            <div className="ques">
              <p className="s-heading-text m-0">
                <b>Assessment Processs</b>
              </p>
            </div>
            <div className="ans">
              <p className="m-text m-0">
                After creating an account, health care practitioner&#39;s
                request the completion of the PUFI-2 via email, and children
                and/or parents complete the assessment on their own.
              </p>
              <p className="m-text m-0">
                Once complete, health care practitioner&#39;s can view raw
                scores and summary charts for use either in an associated
                research project or in clinical use for sharing and discussing
                the results with the child/parent and using within the
                child&#39;s clinical record.
              </p>
            </div>
          </div>

          <div className="ques-wrapper">
            <div className="ques">
              <p className="s-heading-text m-0">
                <b>When should the PUFI-2 be administered?</b>
              </p>
            </div>
            <div className="ans">
              <div className="m-text m-0">
                Reasons for completing the PUFI-2 questionnaire may include, but
                are not limited to:
                <ul>
                  <li>First time prosthetic user</li>
                  <li>
                    After client receives new prosthetic device&#40;s&#41; or
                    any changes/adjustments to their prosthetic
                    device&#40;s&#41; or treatment plan
                  </li>
                  <li>
                    Monitoring prosthetic and functional needs over time
                    &#40;e.g. 3 month, 6 months, 12 months check-in&#41;.{" "}
                  </li>
                </ul>
              </div>
              <p className="m-text m-0">
                Each clinic/health care practitioner will determine when to
                re-administer the PUFI-2 based on their client&#39;s needs and
                practice setting.
              </p>
            </div>
          </div>

          <div className="ques-wrapper">
            <div className="ques">
              <p className="s-heading-text m-0">
                <b>Background and Research Involvement</b>
              </p>
            </div>
            <div className="ans">
              <div className="m-text m-0">
                The PUFI was created and validated over 25 years ago at Holland
                Bloorview Kids Rehab Hospital by Dr. Virginia Wright and her
                team. The PUFI has since been updated with co-creation
                involvement by children and clinicians.
                <p>
                  <b>Publications:</b>
                </p>
                <ol>
                  <li>
                    Wright FV, Hubbard S, Jutai J, Naumann S. The Prosthetic
                    Upper Extremity Functional Index: development and
                    reliability testing of a new functional status questionnaire
                    for children who use upper extremity prostheses.{" "}
                    <a
                      className="color-green"
                      target="_blank"
                      href="https://pubmed.ncbi.nlm.nih.gov/11382260/"
                    >
                      https://pubmed.ncbi.nlm.nih.gov/11382260/
                    </a>
                  </li>
                  <br />
                  <li>
                    Wright FV, Hubbard S, Naumann S, Jutai J. Evaluation of the
                    validity of the prosthetic upper extremity functional index
                    for children.{" "}
                    <a
                      className="color-green"
                      target="_blank"
                      href="https://pubmed.ncbi.nlm.nih.gov/12690590/"
                    >
                      https://pubmed.ncbi.nlm.nih.gov/12690590/
                    </a>
                  </li>
                </ol>
              </div>
              <p className="m-text m-0">
                The assessment can be taken by the child and/or their
                parent/caregiver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicianHome;
