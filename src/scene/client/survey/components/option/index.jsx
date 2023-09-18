import { Radio } from "@mui/material";
import { PufiOptionResponse } from "./styled";

const Option = () => {
  return (
    <PufiOptionResponse
      value="No don't know"
      control={<Radio />}
      label="No don't know"
    />
  );
};

export default Option;
