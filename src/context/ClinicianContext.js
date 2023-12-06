import { createContext, useEffect, useState } from "react";

export const ClinicianContext = createContext();

export const ClinicianProvider = ({ children }) => {
  const [clinicianDetails, setClinicianDetails] = useState({});
  const updateClinicianDetails = (details) => setClinicianDetails(details);

  const [breakpoint, setBreakpoint] = useState(`desktop`);

  useEffect(() => {
    const mediaQuery = window.matchMedia("screen and (min-width: 1024px)");
    const changeListener = (e) => {
      if (e.matches) {
        setBreakpoint(`desktop`);
      } else {
        setBreakpoint(`mobile`);
      }
    };
    changeListener(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", changeListener);
      return () => {
        mediaQuery.removeEventListener("change", changeListener);
      };
    } else {
      //for backward compatibility with older safari broswers
      mediaQuery.addListener(changeListener);
      return () => {
        mediaQuery.removeListener(changeListener);
      };
    }
  }, []);

  console.log("[Debug] Current Breakpoint == ", breakpoint);

  return (
    <ClinicianContext.Provider
      value={{
        breakpoint,
        clinicianDetails,
        updateClinicianDetails,
      }}
    >
      {children}
    </ClinicianContext.Provider>
  );
};
