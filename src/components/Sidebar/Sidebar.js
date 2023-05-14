import styles from './index.module.css';
import Image from 'next/image';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import UserCone from '../UserCone';
import * as THREE from 'three';
import DoubleSidedImage from '../DoubleSidedImage';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import {
  CameraControls,
  FirstPersonControls,
  FlyControls,
  OrbitControls,
  Stage,
  TransformControls,
} from '@react-three/drei';

const Sidebar = ({
  images,
  setSeq,
  tct,
  maxConeGirth,
  coneHeight,
  mapped,
  highlightColor,
  setHighlightColor,
  emotionColors,
  setHighlightedPerson,
  pop,
}) => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageList, setImageList] = useState(images[0].order);
  const [selectedImage, setSelectedImage] = useState(
    `/images/${images[0].order[0]}.bmp`
  );

  const handleSidebarSwitch = () => {
    if (sidebarOpen) setSidebarOpen(false);
    else setSidebarOpen(true);
  };

  useEffect(() => {
    if (sidebarOpen) {
      sidebarRef.current.style.display = 'grid';
      buttonRef.current.style.left = '33rem';
    } else {
      sidebarRef.current.style.display = 'none';
      buttonRef.current.style.left = '-2rem';
    }
  }, [sidebarOpen]);

  const selectListener = (e) => {
    setImageList(images.filter((seq) => seq.name === e.target.value)[0].order);
    setSeq(images.filter((seq) => seq.name === e.target.value)[0].order);
  };

  return (
    <div>
      <div ref={sidebarRef} className={styles.sidebar}>
        <div className={styles.gallery}>
          <select className={styles.select} onChange={selectListener}>
            {images.map((seq) => (
              <option value={seq.name} key={`seq-${seq.name}`}>
                {seq.name}
              </option>
            ))}
          </select>
          {imageList.map((image, index) => {
            let style = { width: '40%', height: '40%', position: 'relative' };
            if (index % 2)
              style = {
                width: '40%',
                height: '40%',
                position: 'relative',
                left: '60%',
              };
            return (
              <div
                // @ts-ignore
                style={style}
                onClick={() => {
                  setSelectedImage(`/images/${image}.bmp`);
                }}
                key={`img-${image}`}
              >
                <Image
                  src={`/images/${image}.bmp`}
                  alt="Picture of the author"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            );
          })}
        </div>
        <div>
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
              <FirstPersonControls makeDefault />
              <CameraControls makeDefault />
              <DoubleSidedImage
                position={new THREE.Vector3(1.5, 1.5, 0)}
                scale={new THREE.Vector3(3, 3, 0)}
                imageURL={selectedImage}
              ></DoubleSidedImage>
              <>
                <DoubleSidedImage
                  position={new THREE.Vector3(1.5, 1.5, 0)}
                  scale={new THREE.Vector3(3, 3, 0)}
                  imageURL={selectedImage}
                  key={`image-${selectedImage}`}
                ></DoubleSidedImage>
                {mapped[selectedImage.split('/')[2].split('.')[0]]?.map(
                  (cone, coneIndex) => {
                    return (
                      <UserCone
                        position={
                          new THREE.Vector3(
                            maxConeGirth * 2 * coneIndex -
                              Math.floor((maxConeGirth * 2 * coneIndex) / 3) *
                                3, // how deep in
                            Math.floor((maxConeGirth * 2 * coneIndex) / 5), // how hight
                            0.5
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
                  }
                )}
              </>
            </Stage>
          </Canvas>
        </div>
      </div>
      <button
        onClick={handleSidebarSwitch}
        className={styles.sidebarButton}
        ref={buttonRef}
      >
        v
      </button>
    </div>
  );
};

export async function getStaticProps(ctx) {
  const res = await fetch('http://127.0.0.1:6532/api/toJSON/presentSeq');
  if (!res.ok) throw new Error('Error fetching sites props');
  const parsedRes = await res.json();
  return {
    props: parsedRes,
  };
}

export default Sidebar;
