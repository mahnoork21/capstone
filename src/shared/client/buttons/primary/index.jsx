import { StyledPrimaryClientButton } from "./styled";

const PrimaryClientButton = ({ children, onClick }) => {
  return (
    <StyledPrimaryClientButton variant="contained" onClick={onClick}>
      {children}
    </StyledPrimaryClientButton>
  );
};

export default PrimaryClientButton;
