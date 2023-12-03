import MessageToUser from "@/scene/client/survey/components/info-component";
import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const SurveyIdInfoWarpper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 12px 16px;
  gap: 4px 8px;
  margin-top: 16px;
  background-color: var(--pufi-grey-light);
  border-radius: 8px;

  & > p:nth-child(odd) {
    justify-self: end;
  }

  & > p:nth-child(even) {
    font-weight: 600;
  }

  @media screen and (min-width: ${breakpoint.desktop}) {
    margin-top: 12px;
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  gap: 4px;

  & > p {
    font-weight: bold;
    font-size: 0.875rem;
  }
`;

export const StyledMessageToUser = styled(MessageToUser)`
  margin-top: 16px;

  & p {
    font-size: 1rem;
    width: 100%;
  }
`;
