// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';

const getUsers = () => {
  const userData = fs.readFileSync('ParsedData/participants.txt', 'utf8');

  let participants = userData.split('\n');
  participants.forEach((participant, index) => {
    const splitted = participant.split('\t');
    // @ts-ignore
    participants[index] = {
      name: splitted[0],
      age: splitted[1],
      all: splitted[2],
      emotion: splitted[3],
      gender: splitted[4][0],
    };
  });
  return participants;
};

export default function handler(req, res) {
  try {
    // Fetch tct file data
    const data = fs.readFileSync(`ParsedData/tct.txt`, 'utf8');
    // Fetch user data
    const users = getUsers();

    // Fetch user paths
    const rawUserPaths = fs.readFileSync(
      'ParsedData/clear_data_v2.json',
      'utf8'
    );
    const parsedUserPaths = JSON.parse(rawUserPaths);
    let userPaths = [];
    for (const [key, value] of Object.entries(parsedUserPaths)) {
      userPaths.push({ name: key, ...value });
    }

    // Map data into our format
    let splitData = data.split('\n');
    const header = splitData[0].split('\t');
    let maxTime = 1;
    splitData.slice(1).forEach((bit, index) => {
      let temp = bit.split('\t');
      let newOb = {};

      let userPath = userPaths.filter((p) => p.name == temp[0]);

      newOb['RecordingName'] = temp[0];
      newOb['Person'] = users.filter((person) => person['name'] == temp[0])[0];
      header.forEach((key, index) => {
        let tempSplit = key.split('_');
        if (
          tempSplit[tempSplit.length - 1] == 'Mean' ||
          tempSplit[tempSplit.length - 1] == 'participant'
        ) {
          if (!isNaN(+temp[index]) && +temp[index] > maxTime)
            maxTime = +temp[index];
          newOb[`${tempSplit.slice(1).join('_').split('.')[0]}.bmp`] = [
            +temp[index],
            tempSplit.join('_').split('.')[1].split('_').slice(1, -1).join('_'),
            userPath[0][`${tempSplit.slice(1).join('_').split('.')[0]}.bmp`],
          ];
        }
        Object.keys(userPaths[0])
          .splice(1)
          .forEach((foo, index) => {
            if (!newOb[foo]) {
              newOb[foo] = [10, 'something', userPath[0][foo]];
            }
          });
      });
      // @ts-ignore
      splitData[index] = newOb;
    });

    splitData = splitData.slice(0, splitData.length - 1);
    let foo = { timeData: splitData, maxTime: maxTime };

    res.status(200).json({ timeData: splitData, maxTime: maxTime });
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
