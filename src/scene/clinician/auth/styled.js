import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";


export const AuthContainer = styled.div`
    border-radius: 20px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25);
    max-width:  ${breakpoint.desktop};
    margin: 1em auto;
    padding: 1em;
    background-color: rgb(216, 216, 216);
`;