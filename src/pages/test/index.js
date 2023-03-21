import Head from 'next/head';
import Image from 'next/image';
import { Inter, Leckerli_One } from 'next/font/google';
import styles from './index.module.css';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useState, useRef } from 'react';
import * as THREE from 'three';

// const inter = Inter({ subsets: ['latin'] });
export default function graphPage(props) {
  const [data, setData] = useState(props.foo);
  const [filteredData, setFilteredData] = useState(props.foo);
  let sliderRef = useRef(null);
  // console.log(props);
  const handleSlider = (event) => {
    console.log(event.target.value);
    console.log(sliderRef.current.value);
    setFilteredData(
      data.filter(
        (gazeEvent) =>
          gazeEvent.GazeEventDuration < parseInt(event.target.value)
      )
    );
  };
  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          type="range"
          min={0}
          max={500}
          ref={sliderRef}
          onMouseUp={handleSlider}
        ></input>
        <p>{sliderRef?.current?.value}</p>
      </div>

      {filteredData.map((gazeEvent, index) => {
        return <p key={index}>{gazeEvent.GazeEventDuration}</p>;
      })}
    </>
  );
}

export async function getStaticProps(ctx) {
  const res = await fetch('http://127.0.0.1:6532/api/user/N103');
  if (!res.ok) throw new Error('Error fetching sites props');
  const parsedRes = await res.json();
  return {
    props: {
      foo: parsedRes,
    },
  };
}
