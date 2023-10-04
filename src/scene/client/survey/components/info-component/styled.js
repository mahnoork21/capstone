import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const UserMessageWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
  align-items: center;
  scroll-margin-top: 340px;

  p {
    width: calc(82%);
    font-weight: ${(props) => (props.questionId === "do" ? 700 : 600)};
    font-size: 0.75rem;

    @media screen and (min-width: ${breakpoint.desktop}) {
      width: 550px;
    }
  }
`;
