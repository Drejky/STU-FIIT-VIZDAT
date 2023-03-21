import Head from 'next/head';
import Image from 'next/image';
import { Inter, Leckerli_One } from 'next/font/google';
import styles from './index.module.css';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useState, useRef } from 'react';
import * as THREE from 'three';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const inter = Inter({ subsets: ['latin'] });
export default function graphPage(props) {
  const [data, setData] = useState(props.participants);
  const [filteredData, setFilteredData] = useState(props.participants);
  let sliderRef = useRef(null);

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
  const labels = ['Positive', 'Neutral', 'Positive music', 'Unknown', '4'];
  const graphData = {
    labels,
    datasets: [
      {
        label: 'Female',
        data: [
          props.positive.female,
          props.neutral.female,
          props.positiveMusic.female,
          props.unknown.female,
          props['4'].female,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Male',
        data: [
          props.positive.male,
          props.neutral.male,
          props.positiveMusic.male,
          props.unknown.male,
          props['4'].male,
        ],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const handleSlider = (event) => {
    // setFilteredData(
    //   data.filter(
    //     (gazeEvent) =>
    //       gazeEvent.GazeEventDuration < parseInt(event.target.value)
    //   )
    // );
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="range"
          min={0}
          max={500}
          ref={sliderRef}
          onMouseUp={handleSlider}
        ></input>
      </div>
      <div>
        <Bar
          options={options}
          data={graphData}
          className={styles.barGraph}
        ></Bar>
      </div>
      <div>
        {/* {filteredData.map((participant, index) => {
          return <p key={index}>{participant.name}</p>;
        })} */}
        foo
      </div>
    </div>
  );
}

export async function getStaticProps(ctx) {
  const res = await fetch('http://127.0.0.1:6532/api/emotionCount');
  if (!res.ok) throw new Error('Error fetching sites props');
  const parsedRes = await res.json();
  return {
    props: parsedRes,
  };
}
