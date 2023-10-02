export const questionIds = ["do", "how", "well", "useful", "without"];

export const youngChildSurvey = [
  {
    questionId: "do",
    label: "Does your child do the activity?",
    options: [
      {
        label: "Yes",
        value: 2,
      },
      {
        label: "Has not tried but could probably do it",
        messageIfSelected:
          "That's okay that your child has not tried it. Please try to imagine your child doing the activity and answer the questions below.",
        value: 1,
      },
      {
        label: "No, cannot do even with help",
        value: 0,
      },
    ],
  },
  {
    questionId: "how",
    label: "How does your child USUALLY do the activity?",
    responseGuideType: "activityGuide",
    comment: {
      hint: "[Optional] Notes for clinicians (for example, why you chose a particular response, other ways you've seen your child perform an activity, etc.)",
    },
    visibleWhen: { questionId: "do", optionIndex: [0, 1] },
    options: [
      {
        label:
          "Both arms together with the prosthetic hand or terminal device used actively (open and close hand/device to hold the object)",
        responseGuideType: "activityGuide-actively",
        value: 5,
      },
      {
        label:
          "Both arms together with the prosthesis used passively (to position or stabilize the object, hand does not open/close)",
        responseGuideType: "activityGuide-passively",
        value: 4,
      },
      {
        label:
          "With assistance of residual limb and/or another body part and/or other assistive devices",
        responseGuideType: "activityGuide-anotherBodyPart",
        additionalResponseIfSelected: {
          type: "text",
          hint: "Please list the body part(s) and/or assistive device(s) your child uses to do the activity.",
          info: "Please separate items with a comma.",
        },
        value: 3,
      },
      {
        label: "With non-prosthetic hand alone",
        responseGuideType: "activityGuide-nonProstehticHand",
        value: 2,
      },
      {
        label: "With some help from another person",
        responseGuideType: "activityGuide-anotherPerson",
        value: 1,
      },
      {
        label: "Don't know/not sure",
        responseGuideType: "activityGuide-notSure",
        additionalResponseIfSelected: {
          label: "[Required] Comment for Don't know/not sure",
        },
        value: 0,
      },
    ],
  },
  {
    questionId: "well",
    label: "How well does your child do the activity using the prosthesis?",
    responseGuideType: "difficultyScale",
    comment: {
      hint: "[Optional] Notes for clinicians (for example, why you chose a particular response, other ways you've seen your child perform an activity, etc.)",
    },
    visibleWhen: { questionId: "how", optionIndex: [0, 1, 2, 3, 4] },
    options: [
      {
        label: "With no difficulty",
        responseGuideType: "difficultyScale-noDifficulty",
        value: 4,
      },
      {
        label: "With some difficulty",
        responseGuideType: "difficultyScale-someDifficulty",
        value: 3,
      },
      {
        label: "With great difficulty",
        responseGuideType: "difficultyScale-greatDifficulty",
        value: 2,
      },
      {
        label:
          "It is so difficult that my child needs help from another person",
        responseGuideType: "difficultyScale-anotherPerson",
        value: 1,
      },
      {
        label: "Even with help, my child cannot do it using the prosthesis",
        responseGuideType: "difficultyScale-cannotDo",
        value: 0,
      },
    ],
  },
  {
    questionId: "useful",
    label: "How useful is the prosthesis for the activity?",
    visibleWhen: { questionId: "well" },
    comment: {
      hint: "[Optional] Notes for clinicians (for example, why you chose a particular response, other ways you've seen your child perform an activity, etc.)",
    },
    options: [
      {
        label: "Very useful",
        value: 2,
      },
      {
        label: "Somewhat useful",
        value: 1,
      },
      {
        label: "Not useful",
        value: 0,
      },
    ],
  },
  {
    questionId: "without",
    label: "How well does your child do the activity without the prosthesis?",
    responseGuideType: "difficultyScale",
    comment: {
      hint: "[Optional] Notes for clinicians (for example, why you chose a particular response, other ways you've seen your child perform an activity, etc.)",
    },
    visibleWhen: { questionId: "useful" },
    options: [
      {
        label: "With no difficulty",
        responseGuideType: "difficultyScale-noDifficulty",
        value: 4,
      },
      {
        label: "With some difficulty",
        responseGuideType: "difficultyScale-someDifficulty",
        value: 3,
      },
      {
        label: "With great difficulty",
        responseGuideType: "difficultyScale-greatDifficulty",
        value: 2,
      },
      {
        label:
          "It is so difficult that my child needs help from another person",
        responseGuideType: "difficultyScale-anotherPerson",
        value: 1,
      },
      {
        label: "Even with help, my child cannot do it using the prosthesis",
        responseGuideType: "difficultyScale-cannotDo",
        value: 0,
      },
    ],
  },
];
