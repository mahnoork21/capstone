import Image from "next/image";
import "./styled";
import { UserMessageWrapper } from "./styled";

const InfoToUser = ({ message, fillWidth, questionId }) => {
  console.log("@@@ Fillwidth =", fillWidth);

  return (
    <UserMessageWrapper questionId={questionId} fillWidth={fillWidth}>
      <Image width={32} height={32} src="/icons/info.svg" />
      <p>{message}</p>
    </UserMessageWrapper>
  );
};

export default InfoToUser;
