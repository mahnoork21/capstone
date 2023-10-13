import { ClientContext } from "@/context/ClientContext";
import { useContext } from "react";
import {
  CenterColumn,
  LeftRightColumn,
  Row,
} from "../before-start-survey-row/styled";
import { headerData } from "../../data";

const HeaderRow = () => {
  const { breakpoint } = useContext(ClientContext);
  return breakpoint === "desktop" ? (
    <Row>
      <LeftRightColumn />
      <CenterColumn>
        <h1>{headerData.header}</h1>
        <p>{headerData.subHeader}</p>
      </CenterColumn>
      <LeftRightColumn />
    </Row>
  ) : (
    <CenterColumn>
      <h1 className="mobile-header">{headerData.header}</h1>
      <p>{headerData.subHeader}</p>
    </CenterColumn>
  );
};

export default HeaderRow;
