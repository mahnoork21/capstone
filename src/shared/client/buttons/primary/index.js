const { StyledPrimaryClientButton } = require("./styled");

const PrimaryClientButton = ({ children }) => {
  return (
    <StyledPrimaryClientButton variant="contained">
      {children}{" "}
    </StyledPrimaryClientButton>
  );
};

export default PrimaryClientButton;
