import styled from "@emotion/styled";

export const Container = styled.div`
  flex-shrink: 0;
  border-radius: 8px;
  background: #fff;

  padding: 20px 30px 30px 30px;
  margin-top: 20px;

  & .weighted-heading {
    font-weight: 600;
    font-size: 1.2rem; /* Larger font size for headings */
  }

  & .weighted-subheading {
    font-weight: 600;
    font-size: 1.1rem; /* Slightly larger font size for subheadings */
    margin-top: 10px; /* More spacing between subheadings and content */
  }

  & .section {
    margin-top: 20px; /* Spacing between sections */
  }

  & ul {
    list-style-type: disc;
    margin-left: 20px;
  }

  & li {
    padding: 5px 0;
  }

  & p {
    padding: 10px;
  }
`;
