import Image from "next/image";
import "./styled";
import { UserMessageWrapper } from "./styled";
import { forwardRef } from "react";

const MessageToUser = forwardRef(
  ({ message, questionId, type = "info" }, ref) => {
    return (
      <UserMessageWrapper questionId={questionId} ref={ref}>
        {type === "info" ? (
          <Image width={32} height={32} src="/icons/info.svg" />
        ) : (
          <Image width={32} height={32} src="/icons/error.svg" />
        )}
        <p>{message}</p>
      </UserMessageWrapper>
    );
  }
);

export default MessageToUser;
