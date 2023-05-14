import { extend, useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
extend({ OutlinePass });

function Arrow({ start, end }) {
  const arrowRef = useRef();

  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const arrowHelper = new THREE.ArrowHelper(
    direction.normalize(),
    start,
    length,
    'red',
    0.05,
    0.05
  );

  return <primitive ref={arrowRef} object={arrowHelper} />;
}

const UserCone = ({
  girth = 1,
  height,
  color,
  position = new THREE.Vector3(0, 0, 3),
  scale = [3, 3, 0],
  highlightColor,
  setHighlightColor,
  person,
  emotionColors,
  setHighlightedPerson,
  time,
  path,
  pop,
}) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [isHiglighted, setIsHighlighted] = useState(false);

  // Hardcoded from resolutions given in dataset
  const maxWidth = 1440;
  const maxHeight = 960;

  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  useEffect(() => {
    isHiglighted ? setSelectedColor(highlightColor) : setSelectedColor(color);
  }, [isHiglighted]);

  return (
    <>
      <mesh
        position={position}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          selectedColor == highlightColor
            ? setSelectedColor(color)
            : setSelectedColor(highlightColor);
          setIsHighlighted(!isHiglighted);
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHighlightedPerson({ ...person, time: time });
        }}
      >
        <cylinderGeometry args={[girth, girth, height, 32]}></cylinderGeometry>
        <meshStandardMaterial color={selectedColor} transparent opacity={1} />
      </mesh>
      {isHiglighted
        ? path.map((point, index) => {
            if (index == 0)
              return (
                <mesh
                  position={
                    new THREE.Vector3(
                      (point[0] / maxWidth) * 3,
                      3 - (point[1] / maxHeight) * 3,
                      position.z - height / 2 + index / pop
                    )
                  }
                >
                  <sphereGeometry args={[0.03, 32, 32]} />
                  <meshStandardMaterial color={'yellow'} />
                </mesh>
              );
            else
              return (
                <>
                  <mesh
                    position={
                      new THREE.Vector3(
                        (point[0] / maxWidth) * 3,
                        3 - (point[1] / maxHeight) * 3,
                        position.z - height / 2 + index / pop
                      )
                    }
                  >
                    <sphereGeometry
                      args={
                        index == path.length - 1 ? [0.03, 32, 32] : [0, 0, 0]
                      }
                    />
                    <meshStandardMaterial
                      color={index == path.length - 1 ? 'blue' : 'red'}
                    />
                  </mesh>
                  <Arrow
                    start={
                      new THREE.Vector3(
                        (path[index - 1][0] / maxWidth) * 3,
                        3 - (path[index - 1][1] / maxHeight) * 3,
                        position.z - height / 2 + (index - 1) / pop
                      )
                    }
                    end={
                      new THREE.Vector3(
                        (path[index][0] / maxWidth) * 3,
                        3 - (path[index][1] / maxHeight) * 3,
                        position.z - height / 2 + index / pop
                      )
                    }
                  />
                </>
              );
          })
        : null}
    </>
  );
};

export default UserCone;
