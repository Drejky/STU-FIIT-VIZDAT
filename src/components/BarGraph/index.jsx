import { useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './index.module.css';

const BarGraph = ({ data }) => {
  const [females, setFemales] = useState(
    data.filter((user) => user.Person && user.Person.gender == '2')
  );

  const [males, setMales] = useState(
    data.filter((user) => user.Person && user.Person.gender == '1')
  );
  useEffect(() => {
    setFemales(data.filter((user) => user.Person && user.Person.gender == '2'));
    setMales(data.filter((user) => user.Person && user.Person.gender == '1'));
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    title: {
      display: true,
      text: 'Foo',
    },
  };
  const labels = ['Positive', 'Neutral', 'Positive music', 'Unknown'];
  const graphData = {
    labels,
    datasets: [
      {
        label: 'Female',
        data: [
          females.filter((p) => p.Person.emotion == '1').length,
          females.filter((p) => p.Person.emotion == '2').length,
          females.filter((p) => p.Person.emotion == '3').length,
          females.filter((p) => p.Person.emotion == '4').length,
        ],
        backgroundColor: 'red',
      },
      {
        label: 'Male',
        data: [
          males.filter((p) => p.Person.emotion == '1').length,
          males.filter((p) => p.Person.emotion == '2').length,
          males.filter((p) => p.Person.emotion == '3').length,
          males.filter((p) => p.Person.emotion == '4').length,
        ],
        backgroundColor: 'blue',
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Bar
        // @ts-ignore
        options={options}
        data={graphData}
        className={styles.barGraph}
      ></Bar>
    </div>
  );
};

export default BarGraph;
