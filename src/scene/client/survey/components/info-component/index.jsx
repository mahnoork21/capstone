import Image from "next/image";
import "./styled";
import { UserMessageWrapper } from "./styled";
import { forwardRef } from "react";

const MessageToUser = forwardRef(
  ({ message, questionId, type = "info", className }, ref) => {
    return (
      <UserMessageWrapper
        questionId={questionId}
        ref={ref}
        className={className}
      >
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

MessageToUser.displayName = "MessageToUser";

export default MessageToUser;
