import ClinicianProvider from "@/context/ClinicianContext";

const ClinicianLayout = ({ children }) => {
  return <ClinicianProvider>{children}</ClinicianProvider>;
};

export default ClinicianLayout;
