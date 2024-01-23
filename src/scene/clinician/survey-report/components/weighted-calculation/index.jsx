import { Container } from "./styled";

const WeightedCalculation = () => {
  return (
    <Container>
      <h3 className="weighted-heading">Total Score Calculation</h3>

      <div className="section">
        <h4 className="weighted-subheading">Ability With Prosthesis:</h4>
        <ul>
          <li>No difficulty = x4</li>
          <li>Some difficulty = x3</li>
          <li>Great difficulty = x2</li>
          <li>Needs help = x1</li>
          <li>Cannot do it = x0</li>
        </ul>
        <p>Divided by total possible score = 23 items x4 (no difficulty)</p>
      </div>

      <div className="section">
        <h4 className="weighted-subheading">Prosthesis Usefulness:</h4>
        <ul>
          <li>Very useful = x2</li>
          <li>Somewhat useful = x1</li>
          <li>Not useful = x0</li>
        </ul>
        <p>Divided by total possible score = 23 items x2 (very useful)</p>
      </div>

      <div className="section">
        <h4 className="weighted-subheading">Ability Without Prosthesis:</h4>
        <ul>
          <li>No difficulty = x4</li>
          <li>Some difficulty = x3</li>
          <li>Great difficulty = x2</li>
          <li>Needs help = x1</li>
          <li>Cannot do it = x0</li>
        </ul>
        <p>Divided by total possible score = 23 items x4 (no difficulty)</p>
      </div>
    </Container>
  );
};

export default WeightedCalculation;
