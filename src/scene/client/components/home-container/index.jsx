import React, { useState, useEffect } from "react";
import { IntroBody } from "./styled";

const HomeContainer = ({ children }) => {
  return <IntroBody>{children}</IntroBody>;
};

export default HomeContainer;
