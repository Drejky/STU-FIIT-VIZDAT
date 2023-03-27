import Head from 'next/head';
import Image from 'next/image';
import { Inter, Leckerli_One } from 'next/font/google';
import styles from './index.module.css';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import Sidebar from '../../components/Sidebar/Sidebar';
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
export default function graphPage({ emotions, presentSeq }) {
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
          emotions.positive.female,
          emotions.neutral.female,
          emotions.positiveMusic.female,
          emotions.unknown.female,
          emotions['4'].female,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Male',
        data: [
          emotions.positive.male,
          emotions.neutral.male,
          emotions.positiveMusic.male,
          emotions.unknown.male,
          emotions['4'].male,
        ],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className={styles.pageWrapper}>
      <Sidebar images={presentSeq}></Sidebar>
      <div className={styles.container}>
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
    </div>
  );
}

export async function getStaticProps(ctx) {
  const emotionCount = await fetch('http://127.0.0.1:6532/api/emotionCount');
  if (!emotionCount.ok) throw new Error('Error fetching sites props');
  const presentSeq = await fetch('http://127.0.0.1:6532/api/toJSON/presentSeq');
  if (!presentSeq.ok) throw new Error('Error fetching sites props');
  const parsedEmotionCount = await emotionCount.json();
  const parsedpresentSeq = await presentSeq.json();
  return {
    props: {
      emotions: parsedEmotionCount,
      presentSeq: parsedpresentSeq,
    },
  };
}
