// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';

export default function handler(req, res) {
  const { name } = req.query;
  try {
    const data = fs.readFileSync(`ParsedData/tct.txt`, 'utf8');
    let splitData = data.split('\n');
    const header = splitData[0].split('\t');
    splitData.slice(1).forEach((bit, index) => {
      let temp = bit.split('\t');
      let newOb = {};
      header.forEach((key, index) => {
        newOb[key] = temp[index];
      });
      splitData[index] = newOb;
    });

    splitData = splitData.slice(0, splitData.length - 1);

    console.log(
      splitData.filter(
        (ob) =>
          ob[
            'Time to First Fixation_uniqueZltyKruh_obr02_change.bmp_unique_N'
          ] == '2'
      )
    );

    res.status(200).json(splitData);
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
/*
participant
  age
  ...
  scenes
    time to first fixation
  sequence
    order from presentseq

*/