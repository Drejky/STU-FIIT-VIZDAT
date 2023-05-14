import { useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './index.module.css';
import { mean, range } from 'lodash';

import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const labels = [
    'Not set',
    '< 20',
    '21-22',
    '23-24',
    '25-26',
    '27-28',
    '29-30',
    '>30',
  ];

  const [ageGroups, setAgeGroups] = useState([]);

  useEffect(() => {
    // data.filter((p) => p.Person && p.Person.age)
    let temp = [];
    range(-1, 8)
      .filter((num) => num != 0)
      .forEach((age) => {
        temp.push(data.filter((p) => p.Person && +p.Person.age == age).length);
      });
    setAgeGroups(temp);
  }, [data]);

  const chartData = {
    labels,
    datasets: [
      {
        data: ageGroups,
        backgroundColor: [
          'red',
          'blue',
          'yellow',
          'purple',
          'orange',
          'green',
          'teal',
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
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
