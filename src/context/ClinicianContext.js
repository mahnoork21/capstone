import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const ClinicianContext = createContext();

export const ClinicianProvider = ({ children }) => {
  const [clinicianDetails, setClinicianDetails] = useState({});
  const updateClinicianDetails = (details) => setClinicianDetails(details);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  const [breakpoint, setBreakpoint] = useState(`desktop`);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        if (router.pathname === "/clinician/login") {
          router.push("/clinician/dashboard");
        }
      } else {
        router.push("/clinician/login");
      }
    });

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

  if (process.env.NEXT_PUBLIC_NAME === "development") {
    console.log("[Debug] Current Breakpoint == ", breakpoint);
    console.log("[Debug] Current user == ", currentUser);
  }

  return (
    <ClinicianContext.Provider
      value={{
        breakpoint,
        clinicianDetails,
        updateClinicianDetails,
        currentUser,
      }}
    >
      {children}
    </ClinicianContext.Provider>
  );
};
