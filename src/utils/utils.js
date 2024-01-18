export const isNullOrUndefined = (value) =>
  value === undefined || value === null;

export const getLocaleYoungChildSurvey = (intl) => {
  return [
    {
      questionId: "do",
      label: intl.formatMessage({
        id: "client.survey.question.do",
        defaultMessage: "Does your child do the activity?",
        description: "Do question",
      }),
      options: [
        {
          label: intl.formatMessage({
            id: "client.survey.question.do.option-1",
            defaultMessage: "Yes",
            description: "Do option 1",
          }),
          value: 2,
        },
        {
          labelShort: "Has not tried",
          label: intl.formatMessage({
            id: "client.survey.question.do.option-2",
            defaultMessage: "Has not tried but could probably do it",
            description: "Do option 2",
          }),
          messageIfSelected:
            "That's okay that your child has not tried it. Please try to imagine your child doing the activity and answer the questions below.",
          value: 1,
        },
        {
          rawScoreLabel: "Cannot do",
          labelShort: "No cannot do",
          label: intl.formatMessage({
            id: "client.survey.question.do.option-3",
            defaultMessage: "No, cannot do even with help",
            description: "Do option 3",
          }),
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
};

export const getLocaleYoungChildActivity = (intl) => {
  return [
    {
      id: "socks",
      label: intl.formatMessage({
        id: "client.survey.activity.sock",
        defaultMessage: "Put on a pair of socks",
        description: "sock label",
      }),
      image: "01-socks.png",
    },
    {
      id: "velcro",
      label: intl.formatMessage({
        id: "client.survey.activity.velcro",
        defaultMessage: "Open Up And Put Shoes On And Do Up The Velcro",
        description: "sock label",
      }),
      image: "02-velcro.png",
    },
    {
      id: "pants",
      label: "Pull On Pants, Jeans, Or Leggings",
      image: "03-pants.png",
    },
    {
      id: "t-shirt",
      label: "Put On An Over-The-Head T-Shirt, Sweatshirt, Or Hoodie",
      image: "04-t-shirt.png",
    },
    {
      id: "zipper",
      label: "Do Up The Zipper Of A Coat Or Jacket",
      image: "05-zipper.png",
    },
    {
      id: "cheese",
      label: "Spread Cheese, Jam, Or Butter On A Cracker",
      image: "06-cheese.png",
    },
    {
      id: "blocks",
      label: "Pull Apart Large Building Blocks (e.g., Duplo Or Lego)",
      image: "07-blocks.png",
    },
    {
      id: "book",
      label: "Hold A Board Book And Turn Pages While Reading",
      image: "08-book.png",
    },
    {
      id: "bowl",
      label: "Hold A Bowl And Stir With A Spoon For Play Cooking",
      image: "09-bowl.png",
    },
    {
      id: "lid",
      label: "Twist The Lid Off A Small Bottle (e.g., Bubbles)",
      image: "10-lid.png",
    },
    {
      id: "box",
      label: "Open A Box Of Crayons",
      image: "11-box.png",
    },
    {
      id: "marker",
      label: "Take The Cap Off A Marker And Then Put It Back On",
      image: "12-marker.png",
    },
    {
      id: "glue",
      label: "Open And Squeeze Glue Onto Paper For Arts And Crafts",
      image: "13-glue.png",
    },
    {
      id: "beads",
      label: "Thread A String Of Beads Or Macaroni",
      image: "14-beads.png",
    },
    {
      id: "cut",
      label: "Cut Out A Picture Or Shape With Scissors",
      image: "15-cut.png",
    },
    {
      id: "stickers",
      label: "Remove Stickers From Backing And Stick On A Page",
      image: "16-stickers.png",
    },
    {
      id: "music",
      label:
        "Play A Musical Instrument Like Triangle, Drum, Mariache, Cymbals, Or Recorder",
      image: "17-music.png",
    },
    {
      id: "clean",
      label:
        "Clean Up And Put Away Own Toys After Playing (e.g., Toy Bin, Large Toys, Lego/Duplo)",
      image: "18-clean.png",
    },
    {
      id: "tablet",
      label: "Hold And Use A Tablet Or Smart Phone",
      image: "19-tablet.png",
    },
    {
      id: "ball",
      label: "Throw And Catch A Large Ball",
      image: "20-ball.png",
    },
    {
      id: "swing",
      label: "Hold Onto Both Ropes While Swinging On A Swing",
      image: "21-swing.png",
    },
    {
      id: "slide",
      label: "Climb The Ladder Of A Slide Or Other Playground Equipment",
      image: "22-slide.png",
    },
    {
      id: "bike",
      label: "Hold The Handles Of A Ride-On-Toy, Tricycle, Bicycle, Or Scooter",
      image: "23-bike.png",
    },
  ];
};
