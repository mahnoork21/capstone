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
        messageIfSelected: {
          label:
            "That's okay that your child has not tried it. Please try to imagine your child doing the activity and answer the questions below.",
          type: "loud", //subtle, normal, loud
        },
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
        optionIndex: 0,
        label:
          "Both arms together with the prosthetic hand or terminal device used actively (open and close hand/device to hold the object)",
        // responseGuide: {
        //   image: "actively.jpg",
        //   label: "Both arms together with the prosthesis actively to grasp",
        // },
        responseGuideType: "activityGuide-actively",
      },
      {
        optionIndex: 1,
        label:
          "Both arms together with the prosthesis used passively (to position or stabilize the object, hand does not open/close)",
        // responseGuide: {
        //   image: "passively.jpg",
        //   label: "Both arms together with the prosthesis passively to grasp",
        // },
        responseGuideType: "activityGuide-passively",
      },
      {
        optionIndex: 2,
        label:
          "With assistance of residual limb and/or another body part and/or other assistive devices",
        // responseGuide: {
        //   image: "another-body-part.jpg",
        //   label: "With the assistance of the residual limb",
        // },
        responseGuideType: "activityGuide-anotherBodyPart",
        additionalResponseIfSelected: {
          type: "text",
          hint: "Please list the body part(s) and/or assistive device(s) your child uses to do the activity.",
          info: "Please separate items with a comma.",
        },
      },
      {
        optionIndex: 3,
        label: "With non-prosthetic hand alone",
        // responseGuide: {
        //   image: "non-prostehtic-hand.jpg",
        //   label: "With the non-prosthetic hand alone",
        // },
        responseGuideType: "activityGuide-nonProstehticHand",
      },
      {
        optionIndex: 4,
        label: "With some help from another person",
        // responseGuide: {
        //   image: "another-person.jpg",
        //   label: "With some help from another person",
        // },
        responseGuideType: "activityGuide-anotherPerson",
      },
      {
        optionIndex: 5,
        label: "Don't know/not sure",
        // responseGuide: {
        //   image: "not-sure.jpg",
        //   label:
        //     "Don't know/ not sure\nUse this choice if none of the ways shown above seems quite right",
        // },
        responseGuideType: "activityGuide-notSure",
        additionalResponseIfSelected: {
          label: "[Required] Comment for Don't know/not sure",
        },
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
        optionIndex: 0,
        label: "With no difficulty",
        responseGuideType: "difficultyScale-noDifficulty",
      },
      {
        optionIndex: 1,
        label: "With some difficulty",
        responseGuideType: "difficultyScale-someDifficulty",
      },
      {
        optionIndex: 2,
        label: "With great difficulty",
        responseGuideType: "difficultyScale-greatDifficulty",
      },
      {
        optionIndex: 3,
        label:
          "It is so difficult that my child needs help from another person",
        responseGuideType: "difficultyScale-anotherPerson",
      },
      {
        optionIndex: 4,
        label: "Even with help, my child cannot do it using the prosthesis",
        responseGuideType: "difficultyScale-cannotDo",
      },
    ],
  },
  {
    questionId: "useful",
    label: "How useful is the prosthesis for the activity?",
    visibleWhen: { questionId: "well" },
    options: [
      {
        optionIndex: 0,
        label: "Very useful",
        value: 2,
      },
      {
        optionIndex: 1,
        label: "Somewhat useful",
        value: 1,
      },
      {
        optionIndex: 2,
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
        optionIndex: 0,
        label: "With no difficulty",
        responseGuideType: "difficultyScale-noDifficulty",
      },
      {
        optionIndex: 1,
        label: "With some difficulty",
        responseGuideType: "difficultyScale-someDifficulty",
      },
      {
        optionIndex: 2,
        label: "With great difficulty",
        responseGuideType: "difficultyScale-greatDifficulty",
      },
      {
        optionIndex: 3,
        label:
          "It is so difficult that my child needs help from another person",
        responseGuideType: "difficultyScale-anotherPerson",
      },
      {
        optionIndex: 4,
        label: "Even with help, my child cannot do it using the prosthesis",
        responseGuideType: "difficultyScale-cannotDo",
      },
    ],
  },
];
