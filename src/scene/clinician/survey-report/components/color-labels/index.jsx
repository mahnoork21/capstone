import Image from "next/image";
import { colorImageLables } from "../activity-analysis/helper/color-image-labels";
import { Container } from "./styled";

const ColorLabels = ({ amount }) => {
  return (
    <Container>
      <div className="item"></div>
      {colorImageLables.map((src, index) =>
        index < amount ? (
          <Image key={src} src={src} width={16} height={16} className="item" />
        ) : null
      )}
      <div className="item"></div>
    </Container>
  );
};

export default ColorLabels;
