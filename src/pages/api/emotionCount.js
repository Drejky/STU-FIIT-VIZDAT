// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';
// Age:	1:< 20	2:21-22	3:23-24	4:25-26	5:27-28	6:29-30	7:>30	-1:Not Set
// all:	1:y	2:n	-1:Not Set
// Emotion:	1:Positive	2:Neutral	3:Positive_Music	4: 	-1:Not Set
// Gender:	1:Male	2:Female	-1:Not Set

export default function handler(req, res) {
  try {
    const data = fs.readFileSync('ParsedData/participants.txt', 'utf8');
    let participants = data.split('\n');
    participants.forEach((participant, index) => {
      const splitted = participant.split('\t');
      participants[index] = {
        age: splitted[1],
        emotion: splitted[3],
        gender: splitted[4][0],
      };
    });

    const toSend = {
      positive: {
        male: participants
          .filter((p) => p.emotion == '1')
          .filter((p) => p.gender == '1').length,
        female: participants
          .filter((p) => p.emotion == '1')
          .filter((p) => p.gender == '2').length,
        unknown: participants
          .filter((p) => p.emotion == '1')
          .filter((p) => p.gender == '-1').length,
      },
      neutral: {
        male: participants
          .filter((p) => p.emotion == '2')
          .filter((p) => p.gender == '1').length,
        female: participants
          .filter((p) => p.emotion == '2')
          .filter((p) => p.gender == '2').length,
        unknown: participants
          .filter((p) => p.emotion == '2')
          .filter((p) => p.gender == '-1').length,
      },
      positiveMusic: {
        male: participants
          .filter((p) => p.emotion == '3')
          .filter((p) => p.gender == '1').length,
        female: participants
          .filter((p) => p.emotion == '3')
          .filter((p) => p.gender == '2').length,
        unknown: participants
          .filter((p) => p.emotion == '3')
          .filter((p) => p.gender == '-1').length,
      },
      4: {
        male: participants
          .filter((p) => p.emotion == '4')
          .filter((p) => p.gender == '1').length,
        female: participants
          .filter((p) => p.emotion == '4')
          .filter((p) => p.gender == '2').length,
        unknown: participants
          .filter((p) => p.emotion == '4')
          .filter((p) => p.gender == '-1').length,
      },
      unknown: {
        male: participants
          .filter((p) => p.emotion == '-1')
          .filter((p) => p.gender == '1').length,
        female: participants
          .filter((p) => p.emotion == '-1')
          .filter((p) => p.gender == '2').length,
        unknown: participants
          .filter((p) => p.emotion == '-1')
          .filter((p) => p.gender == '-1').length,
      },
    };

    res.status(200).json(toSend);
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
