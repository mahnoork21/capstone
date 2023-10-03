import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { LinearProgress } from "@mui/material";
import Image from "next/image";

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 12,
  backgroundColor: "white",
  borderColor: "var(--primary-green)",
  borderWidth: 8,
  border: "solid 1px var(--primary-green)",
}));

export const ProgressLabel = styled.p`
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 0.75rem;
  margin-top: 4px;
`;

export const ActivityHeading = styled.h1`
  width: 100%;
  background-color: white;
  font-size: 1.25rem;
  margin-top: 8px;
  position: sticky;
  font-weight: 600;
  top: 0px;
  z-index: 2;

  @media screen and (min-width: ${breakpoint.desktop}) {
    font-size: 1.375rem;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  background-color: white;
  height: 260px;
  position: sticky;
  top: ${(props) => (props.isOneLiner ? "30px" : "60px")};
  z-index: 2;

  @media screen and (min-width: ${breakpoint.desktop}) {
    top: 30px;
  }
`;

export const ActivityImage = styled(Image)`
  object-fit: contain;
  padding: 16px 0;
`;
