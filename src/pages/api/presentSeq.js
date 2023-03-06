// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';
import path from 'path';
import * as dfd from 'danfojs-node';

// Age:	1:< 20	2:21-22	3:23-24	4:25-26	5:27-28	6:29-30	7:>30	-1:Not Set
// all:	1:y	2:n	-1:Not Set
// Emotion:	1:Positive	2:Neutral	3:Positive_Music	4: 	-1:Not Set
// Gender:	1:Male	2:Female	-1:Not Set

export default function handler(req, res) {
  try {
    const data = fs.readFileSync('ParsedData/PresentationSequence.txt', 'utf8');
    let seq = data.split('\n');
    seq.forEach((seqq, index) => {
      const splitted = seqq.split('\t');
      seq[index] = {
        name: splitted[0],
        order: seqq.slice(2).split('\t'),
      };
    });

    res.status(200).json(seq);
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
