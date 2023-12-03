import { StyledSecondayClientButton } from "./styled";

const SecondaryClientButton = ({ children, onClick }) => {
  return (
    <StyledSecondayClientButton variant="outlined" onClick={onClick}>
      {children}
    </StyledSecondayClientButton>
  );
};

export default SecondaryClientButton;
