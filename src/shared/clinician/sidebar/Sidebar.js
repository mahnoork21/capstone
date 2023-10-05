import { ClinicianContext } from "@/context/OldClinicianContext";
import { React, useContext } from "react";

export const Sidebar = () => {
  const { clinicianInfo } = useContext(ClinicianContext);
  return (
    <div className="doc-sidebar">
      {/* head info */}
      <div className="sidebar-head">
        <p className="text m-0">
          <b>{clinicianInfo.first_name}</b>
        </p>
        <p className="text m-0">{clinicianInfo.role}</p>
      </div>
      {/* options */}
      <div className="sidebar-options">
        <ul className="ls-none">
          <li
            className="list-item cp bt-g"
            onClick={() =>
              (window.location.pathname = "/dashboard/client-assessments")
            }
          >
            All Assessments
          </li>

          <li
            className="list-item cp bt-g"
            onClick={() =>
              (window.location.pathname = "/dashboard/clinician-about")
            }
          >
            What is the PUFI?
          </li>
          {/* Keeping the sub-menu list commented for now and will be used if required later */}
          {/* <li><p className="sub-list-heading bt-g m-0">About</p>
            <ul className="ls-none">
              <li className="sub-list-item cp bt-g" onClick={() => window.location.pathname = '/clinician-about'}>What is the PUFI-2?</li>
              <li className="sub-list-item cp bt-g">How to use the PUFI-2?</li>
            </ul>
          </li> */}
          <li className="list-item cp bt-g">Settings</li>
          <li
            className="list-item cp bt-g"
            onClick={() =>
              (window.location.pathname = "/dashboard/clinician-help")
            }
          >
            Help
          </li>
        </ul>
      </div>
    </div>
  );
};
