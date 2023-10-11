import { useState } from "react";

const Position = ({ active }) => {
  const [src] = useState(
    active
      ? "/instructions/navigation/position-green.svg"
      : "/instructions/navigation/position-grey.svg"
  );

  return <img src={src} alt="Navigation Position" />;
};

export default Position;
