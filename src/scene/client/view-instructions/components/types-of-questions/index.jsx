import Image from "next/image";
import { ClientContext } from "@/context/ClientContext";
import { useContext } from "react";
import { ContentWrapper, InfoWrapper } from "@/scene/client/home/styled";

const TypesOfQuestions = () => {
  const { breakpoint } = useContext(ClientContext);
  return (
    <InfoWrapper>
      <ContentWrapper>
        <h1 className="intro-body-header">Types of Questions</h1>
        <p className="content-text">
          The PUFI-2 contains a list of commonly performed daily tasks and for
          each one asks the following questions:
        </p>
        <ul className="content-text instructions1-questions-list">
          <li>Is this an activity that you do?</li>
          <li>How do you USUALLY do the activity?</li>
          <li>How well do you do the activity using the prosthesis?</li>
          <li>How useful is the prosthesis for the activity?</li>
          <li>How well do you do the activity without the prosthesis</li>
        </ul>
      </ContentWrapper>

      <Image
        width={breakpoint === "desktop" ? 476 : 360}
        height={breakpoint === "desktop" ? 402 : 290}
        src="/instructions/types-of-questions/question-example.png"
        alt="Question Example"
      />
    </InfoWrapper>
  );
};

export default TypesOfQuestions;
