import { Box, Button, Card, FormControlLabel, FormLabel, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { InfoOutlined } from "@mui/icons-material";

export const PageHeadingTypography = styled(Typography)`
    font-size: 1.375rem;
    font-weight: 700;
    margin: 24px 16px;
`;

export const MobileContentCard = styled(Card)`
    min-width: 275px;
    max-width: 550px;
    margin-top: 24px;
`;


export const MobileCardHeadingTypography = styled(Typography)`
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
`;

export const FormBox = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 24px 0;
`;

export const ClientIdTypography = styled(Typography)`
    font-size: 0.875rem;
    font-weight: 600;
`;

export const ClientIdTextField = styled(TextField)`
    border-radius: 8px;
    border: 2px solid var(--pufi-grey-dark, #A8A8A8);
    background: #F9F9F9;
`;

export const CenterFlexBox = styled(Box)`
    display: flex;
    align-items: center;
`;

export const GreenInfoOutlinedIcon = styled(InfoOutlined)`
    fill: var(--pufi-primary-dark, #3A9034);
    margin: 8px 4px;
`

export const SmallTextTypography = styled(Typography)`
    font-size: 0.75rem;
    font-weight: 600;
    display: inline;
    margin: 8px 4px;
`;

export const ModifiedFormLabel = styled(FormLabel)`
    color: var(--pufi-black, #333);
    font-size: 0.875rem;
    font-weight: 600;
    margin: 16px 0 0 8px;
`;

export const ModifiedFormControlLabel = styled(FormControlLabel)`
    display: flex;
    padding: 10px 8px;
    align-items: center;
    border-radius: 8px;
    background: #F2F2F2;
    margin: 4px 0;
`;

export const MobileFullWidthButton = styled(Button)`
    display: flex;
    height: 48px;
    padding: 8px 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    flex-grow: 1;
    margin: 16px 8px;
`;