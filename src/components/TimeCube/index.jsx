import { extend, useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
extend({ OutlinePass });

const TimeCube = ({ position = [0, 0, 0], scale = [3, 3, 3] }) => {
  const leCube = useRef();
  useFrame(({ clock }) => {
    // // @ts-ignore
    // leCube.current.rotation.x = clock.getElapsedTime();
    // // @ts-ignore
    // leCube.current.rotation.y = clock.getElapsedTime();
    // // @ts-ignore
    // leCube.current.rotation.z = clock.getElapsedTime();
  });

  useEffect(() => {
    // @ts-ignore
    leCube.current.rotation.x = 0;
    // @ts-ignore
    leCube.current.rotation.y = 0;
    // @ts-ignore
    leCube.current.rotation.z = 0;
  }, []);

  const texture1 = useLoader(
    THREE.TextureLoader,
    '/images/1_findUniqueObject.bmp'
  );
  return (
    <mesh ref={leCube} scale={scale} position={position}>
      <boxGeometry />
      <meshStandardMaterial color="0xffffff" transparent opacity={0.1} />
    </mesh>
  );
};

export default TimeCube;
