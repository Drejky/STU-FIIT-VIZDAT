// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';
import path from 'path';

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
        name: splitted[0],
        age: splitted[1],
        all: splitted[2],
        emotion: splitted[3],
        gender: splitted[4][0],
      };
    });

    let a = [];
    participants.forEach((name) => a.push(name.name));
    console.log(
      a.filter((value, index, array) => array.indexOf(value) !== index)
    );
    console.log(participants.length);

    res.status(200).json(participants);
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
