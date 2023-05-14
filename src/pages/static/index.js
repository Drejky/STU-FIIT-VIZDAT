import styles from './index.module.css';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
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
import React from 'react';
import {
  CameraControls,
  FirstPersonControls,
  FlyControls,
  OrbitControls,
  Stage,
} from '@react-three/drei';
import DoubleSidedImage from '@/components/DoubleSidedImage';
import UserCone from '@/components/UserCone';
import Settings from '@/components/Settings/Settings';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const inter = Inter({ subsets: ['latin'] });
export default function graphPage({ emotions, presentSeq, tct }) {
  const [seq, setSeq] = useState(
    presentSeq.filter((seq) => seq.name === 'A')[0].order
  );
  const [coneHeight, setConeHeight] = useState(0.1);
  const [offset, setOffset] = useState(0);
  const [emotionColors, setEmotionColors] = useState({
    positive: '#00ff00',
    neutral: '#ff0000',
    positive_music: '#A020F0',
    undefined: '#808080',
  });
  const [opacity, setOpacity] = useState(1);
  const [imageGap, setImageGap] = useState(3);
  const [highlightColor, setHighlightColor] = useState('#f6ff78');
  const [maxConeGirth, setMaxConeGirth] = useState(0.1);
  const [pop, setPop] = useState(10);
  const [toGraph, setToGraph] = useState(tct.timeData); //Unmapped data that we filter
  const [mapped, setMapped] = useState({}); //Mapped data into displayed columns
  const [highlightedPerson, setHighlightedPerson] = useState({
    age: null,
    all: null,
    emotion: null,
    gender: null,
    name: null,
    time: null,
    path: [],
  });
  const [mappedHighlightedPerson, setMappedHighlightedPerson] = useState({
    age: null,
    emotion: null,
    gender: null,
    name: null,
    time: null,
    path: [],
  });

  useEffect(() => {
    setMapped(
      seq
        .map((image) => {
          return {
            [image]: toGraph
              .filter((ob) => ob['Person'])
              .map((ob) => {
                return {
                  name: ob['RecordingName'],
                  Time: ob[`${image}.bmp`],
                  person: ob['Person'],
                };
              })
              .map((dat, coneIndex) => {
                let color;
                switch (dat.person?.emotion) {
                  case '1':
                    color = emotionColors['positive'];
                    break;
                  case '2':
                    color = emotionColors['neutral'];
                    break;
                  case '3':
                    color = emotionColors['positive_music'];
                    break;
                  case '4':
                    color = emotionColors['undefined'];
                    break;
                  default:
                    color = emotionColors['undefined'];
                }
                let time;
                let path;
                if (!dat.Time) {
                  time = 0;
                  path = [];
                } else if (dat.Time[0] == 0) {
                  time = 0.001;
                  path = dat.Time[2];
                } else {
                  time = dat.Time[0];
                  path = dat.Time[2];
                }
                return {
                  color: color,
                  time: time,
                  person: dat['person'],
                  path: path,
                };
              }),
          };
        })
        .reduce((acc, curr) => {
          const key = Object.keys(curr)[0];
          acc[key] = curr[key];
          return acc;
        }, {})
    );
  }, [toGraph, emotionColors]);

  useEffect(() => {
    let age;
    switch (highlightedPerson.age) {
      case '1':
        age = 'Less than 20';
        break;
      case '2':
        age = '21-22';
        break;
      case '3':
        age = '23-24';
        break;
      case '4':
        age = '25-26';
        break;
      case '5':
        age = '27-28';
        break;
      case '6':
        age = '29-30';
        break;
      case '7':
        age = 'More than 30';
        break;
      case '-1':
        age = 'Not set';
        break;
    }

    let emotion;
    switch (highlightedPerson.emotion) {
      case '1':
        emotion = 'Positive';
        break;
      case '2':
        emotion = 'Neutral';
        break;
      case '3':
        emotion = 'Positive music';
        break;
      default:
      case '4':
        emotion = 'Not set';
        break;
    }

    let gender;
    switch (highlightedPerson.gender) {
      case '1':
        gender = 'Male';
        break;
      case '2':
        gender = 'Female';
        break;
      default:
      case '-1':
        gender = 'Not set';
        break;
    }

    setMappedHighlightedPerson({
      age: age,
      emotion: emotion,
      gender: gender,
      name: highlightedPerson.name,
      time: highlightedPerson.time,
      path: highlightedPerson.path,
    });
  }, [highlightedPerson]);

  return (
    <div className={styles.pageWrapper}>
      <div
        style={{
          backgroundColor: 'blue',
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          zIndex: '1',
          padding: '.5rem',
        }}
      >
        <p>{`Age: ${mappedHighlightedPerson.age}`}</p>
        <p>{`Name: ${mappedHighlightedPerson.name}`}</p>
        <p>{`Gender: ${mappedHighlightedPerson.gender}`}</p>
        <p>{`Emotion: ${mappedHighlightedPerson.emotion}`}</p>
        <p>{`Time to AOI: ${mappedHighlightedPerson.time}s`}</p>
      </div>
      <Sidebar
        images={presentSeq}
        setSeq={setSeq}
        tct={tct}
        maxConeGirth={maxConeGirth}
        coneHeight={coneHeight}
        mapped={mapped}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
        emotionColors={emotionColors}
        setHighlightedPerson={setHighlightedPerson}
        pop={pop}
      ></Sidebar>
      <Canvas className={styles.canvas}>
        <Stage
          intensity={0.1}
          environment="city"
          shadows={{
            type: 'accumulative',
            color: '#ffffff',
            colorBlend: 2,
            opacity: 2,
          }}
          adjustCamera={false}
        >
          <CameraControls makeDefault />

          {seq.map((image, index) => {
            return (
              <>
                <DoubleSidedImage
                  position={new THREE.Vector3(1.5, 1.5, index * imageGap)}
                  // scale={new THREE.Vector3(3, 3, 0)}
                  imageURL={`/images/${image}.bmp`}
                  key={`image-${index}`}
                  opacity={opacity}
                ></DoubleSidedImage>
                {mapped[image]?.map((cone, coneIndex) => {
                  return (
                    <UserCone
                      position={
                        new THREE.Vector3(
                          (coneIndex % 10) * 0.3 + 0.1,
                          Math.floor(coneIndex / 10) * 0.3 + 0.1,
                          coneHeight / 2 + index * imageGap
                        )
                      }
                      color={cone.color}
                      height={coneHeight}
                      girth={(cone.time / tct.maxTime) * maxConeGirth}
                      key={`cone-${coneIndex}`}
                      highlightColor={highlightColor}
                      setHighlightColor={setHighlightColor}
                      person={cone.person}
                      emotionColors={emotionColors}
                      setHighlightedPerson={setHighlightedPerson}
                      time={cone.time}
                      path={cone.path}
                      pop={pop}
                    />
                  );
                })}
              </>
            );
          })}
        </Stage>
      </Canvas>
      <Settings
        setEmotionColors={setEmotionColors}
        emotionColors={emotionColors}
        data={tct.timeData}
        toGraph={toGraph}
        setData={setToGraph}
        emotions={emotions}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
        setOpacity={setOpacity}
        setPop={setPop}
        setImageGap={setImageGap}
        setConeHeight={setConeHeight}
        setMaxConeGirth={setMaxConeGirth}
      />
    </div>
  );
}

export async function getStaticProps(ctx) {
  const emotionCount = await fetch('http://127.0.0.1:6532/api/emotionCount');
  if (!emotionCount.ok) throw new Error('Error fetching sites props');
  const presentSeq = await fetch('http://127.0.0.1:6532/api/toJSON/presentSeq');
  if (!presentSeq.ok) throw new Error('Error fetching sites props');
  const tct = await fetch('http://127.0.0.1:6532/api/toJSON/tct');
  if (!tct.ok) throw new Error('Error fetching sites props');
  const parsedEmotionCount = await emotionCount.json();
  const parsedpresentSeq = await presentSeq.json();
  const parsedtct = await tct.json();
  return {
    props: {
      emotions: parsedEmotionCount,
      presentSeq: parsedpresentSeq,
      tct: parsedtct,
    },
  };
}
