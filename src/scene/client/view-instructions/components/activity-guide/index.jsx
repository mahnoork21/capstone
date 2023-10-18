import Image from "next/image";
import {
  ActivityGuideCard,
  Container,
  GreyHeader,
  HowQuestion,
} from "./styled";
import { Grid } from "@mui/material";
import { data } from "./data";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";

const ActivityGuide = () => {
  const { breakpoint } = useContext(ClientContext);
  return (
    <Container>
      <GreyHeader>
        <h1>Activity Guide</h1>
        <p>
          This information will help you understand the questions in the survey.
          This information will also be available within the survey.
        </p>
      </GreyHeader>

      <HowQuestion>
        <h2>How is the activity usually performed?</h2>
        <p>
          Choose the way this activity is performed <span>most often</span> if
          done in more than one way
        </p>
      </HowQuestion>

      <Grid container spacing={3} justify="center" alignItems="center">
        {data.map(({ src, text }, index) => (
          <Grid item xs={breakpoint === "desktop" ? 6 : 12} key={index}>
            <ActivityGuideCard>
              <Image
                height={breakpoint === "desktop" ? 140 : 100}
                width={breakpoint === "desktop" ? 140 : 100}
                src={src}
              />
              <p dangerouslySetInnerHTML={{ __html: text }} />
            </ActivityGuideCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActivityGuide;
