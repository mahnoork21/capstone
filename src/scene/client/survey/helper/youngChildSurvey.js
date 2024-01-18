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
        labelShort: "Has not tried",
        label: "Has not tried but could probably do it",
        messageIfSelected:
          "That's okay that your child has not tried it. Please try to imagine your child doing the activity and answer the questions below.",
        value: 1,
      },
      {
        rawScoreLabel: "Cannot do",
        labelShort: "No cannot do",
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
      hint: "[Optional] Information to share with your clinician about your answer (for example, why you chose a particular response, other ways you've seen your child perform an activity, etc.) ",
    },
    visibleWhen: { questionId: "do", optionValue: [1, 2] },
    options: [
      {
        rawScoreLabel: "Prostetic (active)",
        labelShort: "Both arms with prosthetic hand actively",
        label:
          "Both arms together with the prosthetic hand or terminal device used actively (open and close hand/device to hold the object)",
        miniGuideType: "activityGuide-actively",
        value: 5,
      },
      {
        rawScoreLabel: "Prostetic (passive)",
        labelShort: "Both arms with prosthetic hand passively",
        label:
          "Both arms together with the prosthesis used passively (to position or stabilize the object, hand does not open/close)",
        miniGuideType: "activityGuide-passively",
        value: 4,
      },
      {
        rawScoreLabel: "Residual limb/Body part",
        labelShort: "With assistance of residual limb",
        label:
          "With assistance of residual limb and/or another body part and/or other assistive devices",
        miniGuideType: "activityGuide-anotherBodyPart",
        additionalResponseIfSelected: {
          type: "text",
          hint: "Please list the body part(s) and/or assistive device(s) your child uses to do the activity.",
          info: "Please separate items with a comma.",
        },
        value: 3,
      },
      {
        rawScoreLabel: "Non-prosthetic",
        label: "With non-prosthetic hand alone",
        miniGuideType: "activityGuide-nonProstehticHand",
        value: 2,
      },
      {
        rawScoreLabel: "With help",
        label: "With some help from another person",
        miniGuideType: "activityGuide-anotherPerson",
        value: 1,
      },
      {
        rawScoreLabel: "Don't know",
        label: "Don't know/not sure",
        miniGuideType: "activityGuide-notSure",
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
      hint: "[Optional] Information to share with your clinician about your answer (for example, why you chose a particular response, other ways you've seen your child perform an activity, etc.)",
    },
    visibleWhen: { questionId: "how", optionValue: [1, 2, 3, 4, 5] },
    options: [
      {
        labelShort: "No difficulty",
        label: "With no difficulty",
        miniGuideType: "difficultyScale-noDifficulty",
        value: 4,
      },
      {
        labelShort: "Some difficulty",
        label: "With some difficulty",
        miniGuideType: "difficultyScale-someDifficulty",
        value: 3,
      },
      {
        labelShort: "Great difficulty",
        label: "With great difficulty",
        miniGuideType: "difficultyScale-greatDifficulty",
        value: 2,
      },
      {
        labelShort: "With help",
        label:
          "It is so difficult that my child needs help from another person",
        miniGuideType: "difficultyScale-anotherPerson",
        value: 1,
      },
      {
        labelShort: "Cannot do",
        label: "Even with help, my child cannot do it using the prosthesis",
        miniGuideType: "difficultyScale-cannotDo",
        value: 0,
      },
    ],
  },
  {
    questionId: "useful",
    label: "How useful is the prosthesis for the activity?",
    visibleWhen: { questionId: "well", optionValue: [0, 1, 2, 3, 4] },
    comment: {
      hint: "[Optional] Information to share with your clinician about your answer (for example, why you chose a particular response, other ways you've seen your child perform an activity, etc.) ",
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
      hint: "[Optional] Information to share with your clinician about your answer (for example, why you chose a particular response, other ways you've seen your child perform an activity, etc.) ",
    },
    visibleWhen: { questionId: "useful", optionValue: [0, 1, 2, 3, 4] },
    options: [
      {
        labelShort: "No difficulty",
        label: "With no difficulty",
        miniGuideType: "difficultyScale-noDifficulty",
        value: 4,
      },
      {
        labelShort: "Some difficulty",
        label: "With some difficulty",
        miniGuideType: "difficultyScale-someDifficulty",
        value: 3,
      },
      {
        labelShort: "Great difficulty",
        label: "With great difficulty",
        miniGuideType: "difficultyScale-greatDifficulty",
        value: 2,
      },
      {
        labelShort: "With help",
        label:
          "It is so difficult that my child needs help from another person",
        miniGuideType: "difficultyScale-anotherPerson",
        value: 1,
      },
      {
        labelShort: "Cannot do",
        label: "Even with help, my child cannot do it without the prosthesis",
        miniGuideType: "difficultyScale-cannotDo",
        value: 0,
      },
    ],
  },
];
