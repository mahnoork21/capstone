import { ActivityGuideCard } from "./styled";
import Image from "next/image";

const ActivityGuideItem = ({ src, text, imageSize }) => {
  return (
    <ActivityGuideCard>
      <Image height={imageSize} width={imageSize} src={src} />
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </ActivityGuideCard>
  );
};

export default ActivityGuideItem;
