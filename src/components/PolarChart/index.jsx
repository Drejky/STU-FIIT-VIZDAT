import { useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import styles from './index.module.css';
import { mean, range } from 'lodash';

import { Chart } from 'chart.js';
import { PointElement } from 'chart.js';
Chart.register(PointElement);
import 'chart.js/auto';

import { Pie } from 'react-chartjs-2';

const PolarChart = ({ data }) => {
  const labels = ['male', 'female'];

  const [maleAverage, setMaleAverage] = useState(1);
  const [femaleAverage, setFemaleAverage] = useState(1);

  useEffect(() => {
    setMaleAverage(
      mean(
        [].concat(
          ...data
            .filter((user) => user.Person && user.Person.gender == '1')
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
    setFemaleAverage(
      mean(
        [].concat(
          ...data
            .filter((user) => user.Person && user.Person.gender == '2')
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
        data: [maleAverage, femaleAverage],
        backgroundColor: ['blue', 'red'],
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
      <PolarArea data={chartData} options={chartOptions} />
    </div>
  );
};

export default PolarChart;
