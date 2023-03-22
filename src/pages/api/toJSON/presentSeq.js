// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';

export default function handler(req, res) {
  try {
    const data = fs.readFileSync('ParsedData/PresentationSequence.txt', 'utf8');
    let seq = data.split('\n');
    const removeInRegex = new RegExp('^(?!in).+', 'g');
    seq.forEach((seqq, index) => {
      const splitted = seqq.split('\t');
      seq[index] = {
        name: splitted[0],
        order: seqq
          .slice(2)
          .split('\t')
          .filter((pic) => pic.match(removeInRegex))
          .slice(1),
      };
    });
    seq.pop();
    seq.forEach((ob) => console.log(ob.order));

    seq = seq.filter((ob) => ob);

    res.status(200).json(seq);
  } catch (err) {
    console.error(err);
    res.status(404);
  }
}
