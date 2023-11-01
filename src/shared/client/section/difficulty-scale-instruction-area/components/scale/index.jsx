import Image from "next/image";
import { Container } from "./styled";

const Scale = ({ scaleSrc, title, height, width }) => {
  return (
    <Container>
      <Image src={scaleSrc} height={height} width={width} />
      <div className="difficulty-title">
        <p>{title}</p>
      </div>
    </Container>
  );
};
export default Scale;
