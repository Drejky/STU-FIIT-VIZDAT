import { extend, useLoader } from '@react-three/fiber';
import React, { useState } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
extend({ OutlinePass });

const DoubleSidedImage = ({
  position = new THREE.Vector3(0, 0, 3),
  scale = new THREE.Vector3(3, 3, 0),
  imageURL,
  opacity = 1,
}) => {
  const img = new Image();

  // Hardcoded from resolutions given in dataset
  const maxWidth = 1440;
  const maxHeight = 960;
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);

  img.onload = function () {
    setWidth((img.width / maxWidth) * 3);
    setHeight((img.height / maxHeight) * 3);
  };

  img.src = imageURL;

  const texture1 = useLoader(THREE.TextureLoader, imageURL) as THREE.Texture;
  return (
    <mesh scale={new THREE.Vector3(width, height, 0)} position={position}>
      <boxGeometry />
      <meshBasicMaterial attach="material-0" transparent opacity={0.1} />
      <meshBasicMaterial attach="material-1" transparent opacity={0.1} />
      <meshBasicMaterial attach="material-2" transparent opacity={0.1} />
      <meshBasicMaterial attach="material-3" transparent opacity={0.1} />
      <meshBasicMaterial
        attach="material-4"
        transparent
        opacity={opacity}
        map={texture1}
      />
      <meshBasicMaterial
        attach="material-5"
        transparent
        opacity={opacity}
        map={texture1}
      />
    </mesh>
  );
};

export default DoubleSidedImage;
