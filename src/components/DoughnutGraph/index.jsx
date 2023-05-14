import { useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import styles from './index.module.css';
import { mean } from 'lodash';

import { Pie } from 'react-chartjs-2';

const DoughnutGraph = ({ data, emotionColors }) => {
  const labels = ['positive', 'neutral', 'positive music'];

  const [positives, setPositives] = useState(1);
  const [neutrals, setNeutrals] = useState(1);
  const [posMusics, setPosMusics] = useState(1);

  useEffect(() => {
    setPositives(
      mean(
        [].concat(
          ...data
            .filter((user) => user.Person && user.Person.emotion == '1')
            .map((p) => {
              let temp = [];
              for (const [key, value] of Object.entries(p)) {
                if (key != 'RecordingName' && key != 'Person' && value[0]) {
                  temp.push(value[0]);
                }
              }
              return temp;
            })
        )
      )
    );

    setNeutrals(
      mean(
        [].concat(
          ...data
            .filter((user) => user.Person && user.Person.emotion == '2')
            .map((p) => {
              let temp = [];
              for (const [key, value] of Object.entries(p)) {
                if (key != 'RecordingName' && key != 'Person' && value[0]) {
                  temp.push(value[0]);
                }
              }
              return temp;
            })
        )
      )
    );

    setPosMusics(
      mean(
        [].concat(
          ...data
            .filter((user) => user.Person && user.Person.emotion == '3')
            .map((p) => {
              let temp = [];
              for (const [key, value] of Object.entries(p)) {
                if (key != 'RecordingName' && key != 'Person' && value[0]) {
                  temp.push(value[0]);
                }
              }
              return temp;
            })
        )
      )
    );
  }, [data]);

  const chartData = {
    labels,
    datasets: [
      {
        data: [positives, neutrals, posMusics],
        // backgroundColor: ['green', 'red', 'purple'],
        backgroundColor: [
          emotionColors['positive'],
          emotionColors['neutral'],
          emotionColors['positive_music'],
        ],
        borderColor: ['white'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.container}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default DoughnutGraph;
