import { ClinicianContext } from "@/context/OldClinicianContext";
import Link from "next/link";
import { React, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const Header = ({ text, navbarItems }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { clearClinicianInfo } = useContext(ClinicianContext);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token"));
  }, [isLoggedIn]);

  const signInOut = () => {
    if (isLoggedIn) {
      //remove token from the local storage
      localStorage.removeItem("token");
      //clear the clinician data from the context api
      clearClinicianInfo();
      // navigate("/clinician-home");
    } else {
      // handleNavigate("/clinician-login");
    }
  };

  return (
    <div className="doc-header s-heading-text">
      <div className="heading-text">
        <b>{text}</b>
      </div>
      <div className="navbar-menu">
        {navbarItems?.map((item, index) => (
          <Link className="m-0 ml-5 cp" href={item.url} key={index}>
            <b>{item.name}</b>
          </Link>
        ))}
        <button
          className="doc-btn ml-5 cp s-heading-text bg-g-c-w"
          onClick={() => signInOut()}
        >
          <b>{isLoggedIn ? "Sign Out" : "Sign In"}</b>
        </button>
      </div>
    </div>
  );
};
