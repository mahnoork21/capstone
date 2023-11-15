import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";
import DesktopRow from "../desktop-row";
import MobileRow from "../mobile-row";

const BeforeStartSurveyRow = ({ imageSrc, text, imagePosition }) => {
  const { breakpoint } = useContext(ClientContext);
  return breakpoint === "desktop" ? (
    <DesktopRow imagePosition={imagePosition} imageSrc={imageSrc} text={text} />
  ) : (
    <MobileRow imageSrc={imageSrc} text={text} />
  );
};

export default BeforeStartSurveyRow;
