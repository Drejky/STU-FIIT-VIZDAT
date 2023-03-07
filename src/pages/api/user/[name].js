// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';

export default function handler(req, res) {
  const { name } = req.query;
  try {
    const data = fs.readFileSync(
      `ParsedData/gaze_data/FIIT_PSY_${name}.tsv`,
      'utf8'
    );

    //Get all participant names for who we have data (not all from participant list)
    let participantNames = fs.readdirSync('ParsedData/gaze_data');
    participantNames.forEach((participant, index) => {
      participantNames[index] = participantNames[index].replace(
        'FIIT_PSY_',
        ''
      );
      participantNames[index] = participantNames[index].replace('.tsv', '');
    });
    console.log(participantNames);
    // let seq = data.split('\n');
    // seq.forEach((seqq, index) => {
    //   const splitted = seqq.split('\t');
    //   seq[index] = {
    //     name: splitted[0],
    //     order: seqq.slice(2).split('\t'),
    //   };
    // });

    res.status(200).json({ name: 'Helo world' });
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
