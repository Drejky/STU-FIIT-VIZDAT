// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';

export default function handler(req, res) {
  try {
    //Get all participant names for who we have data (not all from participant list)
    let participantNames = fs.readdirSync('ParsedData/gaze_data');
    participantNames.forEach((participant, index) => {
      participantNames[index] = participantNames[index].replace(
        'FIIT_PSY_',
        ''
      );
      participantNames[index] = participantNames[index].replace('.tsv', '');
    });
    res.status(200).json(participantNames);
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
