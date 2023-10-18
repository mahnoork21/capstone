import Image from "next/image";
import React, { useContext } from "react";
import { ClinicianContext } from "@/context/ClinicianContext";
import { Container } from "./styled";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const { breakpoint } = useContext(ClinicianContext);

  return (
    <>
      <Container>
        <Image
          src="/empty-copyholders.svg"
          width={breakpoint === "desktop" ? 322 : 200}
          height={breakpoint === "desktop" ? 314 : 195}
          alt="Empty Copyholders"
        />
        <p>You have not added any clients</p>
        <Button variant="contained">Add Client</Button>
      </Container>
    </>
  );
};

export default Dashboard;
