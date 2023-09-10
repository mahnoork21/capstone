import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const ClinicianContext = createContext();

const ClinicianProvider = ({ children }) => {
  // stores the id (in login page, the token is converted to clinciian_id in the beginning and stored here)
  const [clinicianId, setClinicianId] = useState(null);
  //this stores all the clinician info (even the id)
  const [clinicianInfo, setClinicianInfo] = useState({});

  const storeClinicianId = (id) => {
    setClinicianId(id);
  };

  const storeClinicianInfo = (info) => {
    setClinicianInfo(info);
  };

  //clearing the clinician info
  const clearClinicianInfo = () => {
    setClinicianId(null);
    setClinicianInfo(null);
  };

  //getting clinician_id from the token in the local storage in the context api so that it persists throughout the website
  useEffect(() => {
    const fetchClinicianInfo = async () => {
      // Retrieve token from the local storage
      const token = localStorage.getItem("token");
      if (token) {
        // decode the clinician id back from the token
        const decodedToken = jwtDecode(token, process.env.REACT_APP_TOKEN_KEY);
        const clinicianId = decodedToken.id;
        // pass the decoded clinician id along with the token from local storage to an API that returns back all the clinician details
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/clinician/getClinicianInfo`,
            {
              headers: {
                Authorization: token,
                clinicianId: clinicianId,
              },
            }
          );
          // Assuming clinicianInfo is a property of the response data
          const clinicianInfo = response.data;
          storeClinicianInfo(clinicianInfo);
        } catch (e) {
          console.log(e);
        }
      }
    };

    // call the method that gets token from local storage, decodes it into clincian id using which generates clincian info
    fetchClinicianInfo();
  }, []);

  return (
    <ClinicianContext.Provider
      value={{
        clinicianId,
        storeClinicianId,
        clinicianInfo,
        clearClinicianInfo,
      }}
    >
      {children}
    </ClinicianContext.Provider>
  );
};

export default ClinicianProvider;
