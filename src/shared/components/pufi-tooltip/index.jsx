import { LightTooltip } from "./styled";

const glossary = {
  "terminal device":
    "This refers to the part at the end of your prosthesis. Examples include a myoelectric hand, a hook or a specific device used for certain activities (for example, riding a bike, gymnastics etc.).",
  "upper limb": "This refers to your arm and/or your prosthesis.",
  bilateral:
    "This refers to the ability to use both sides of the body or both arms to perform an activity. For example, holding paper with your arm/prosthesis while cutting with the other hand.",
  passively:
    "The prosthesis helps support or hold onto an object without open and close movements of the terminal device. Examples include: resting your prosthesis on top of paper when you draw, or using your sports prosthesis with a bike device/attachment to hold onto the bike handle bar.",
  actively:
    "The prosthesis helps you hold onto an object using open and close movements of the terminal device. Examples include: using your myoelectric or body powered prosthesis to hold onto paper while your other hand is cutting, or pinching and letting go of a shoelace string when tying shoelaces.",
};

const extractGlossaryTerm = (inputText) => {
  let inputTextTemp = inputText;
  const extractedText = [];

  Object.keys(glossary).forEach((key, glossaryIndex) => {
    const index = inputTextTemp.toLowerCase().indexOf(key);
    if (index !== -1) {
      const regularText = inputTextTemp.slice(0, index);
      extractedText.push({ type: "regular", value: regularText });

      extractedText.push({ type: "tooltip", key: key, value: glossary[key] });

      inputTextTemp = inputTextTemp.slice(index + key.length);
    }

    if (glossaryIndex === Object.keys(glossary).length - 1) {
      extractedText.push({ type: "regular", value: inputTextTemp });
    }
  });

  return extractedText;
};

const PufiToolTip = ({ children }) => {
  return (
    <div>
      {extractGlossaryTerm(children).map((node, index) => {
        switch (node.type) {
          case "regular":
            return <span key={"regular" + index}>{node.value}</span>;
          case "tooltip":
            return (
              <LightTooltip
                key={"tooltip" + 1}
                title={node.value}
                placement="top"
                arrow
              >
                <span style={{ textDecoration: "underline" }}>{node.key}</span>
              </LightTooltip>
            );
        }
      })}
    </div>
  );
};

export default PufiToolTip;
