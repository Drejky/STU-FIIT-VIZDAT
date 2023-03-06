import Head from 'next/head';
import Image from 'next/image';
import { Inter, Leckerli_One } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

function SomeBox() {
  const leCube = useRef();
  useFrame(({ clock }) => {
    leCube.current.rotation.x = clock.getElapsedTime();
    leCube.current.rotation.y = clock.getElapsedTime();
    leCube.current.rotation.z = clock.getElapsedTime();
  });

  return (
    <mesh ref={leCube} scale={[3, 3, 3]}>
      <boxBufferGeometry />
      <meshPhongMaterial />
    </mesh>
  );
}

// const inter = Inter({ subsets: ['latin'] });
export default function dataPage() {
  return (
    <>
      <Canvas>
        <SomeBox />
        <ambientLight args={[0xff0000]} intensity={0.1} />
        <directionalLight color="green" position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
    </>
  );
}
