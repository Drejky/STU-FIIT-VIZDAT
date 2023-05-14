import { useFrame } from '@react-three/fiber';
import React from 'react';
import { useRef } from 'react';

const SomeBox = () => {
  const leCube = useRef();
  useFrame(({ clock }) => {
    // @ts-ignore
    leCube.current.rotation.x = clock.getElapsedTime();
    // @ts-ignore
    leCube.current.rotation.y = clock.getElapsedTime();
    // @ts-ignore
    leCube.current.rotation.z = clock.getElapsedTime();
  });

  return (
    <mesh ref={leCube} scale={[3, 3, 3]}>
      <boxBufferGeometry />
      <meshPhongMaterial />
    </mesh>
  );
};

export default SomeBox;
