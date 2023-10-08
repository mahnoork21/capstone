import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Button, ListItemButton } from "@mui/material";

export const LogOutBtn = styled(Button)`
    border-radius: 12px;
    border: 2px solid var(--pufi-primary-blue, #1979BE);
    flex-grow: 1;
`;

export const MobileNavContainer = styled.div`
    display: flex;


`;

export const SpecialHighlightedListItemBtn = styled(ListItemButton)`
    &.Mui-selected{
        color: var(--pufi-primary-blue, #1979BE);

        & svg {
            color: var(--pufi-primary-blue, #1979BE);
        }
    }

`;

export const NavigationPanel = styled.div`
    background-color: white;
`;