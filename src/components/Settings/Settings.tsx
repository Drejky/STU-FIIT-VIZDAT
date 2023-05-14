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
  FlyControls,
  OrbitControls,
  Stage,
  TransformControls,
} from '@react-three/drei';
import { range } from 'lodash';
import BarGraph from '../BarGraph';
import PieChart from '../PieGraph';
import DoughnutGraph from '../DoughnutGraph';
import PolarChart from '../PolarChart';

const Settings = ({
  setEmotionColors,
  emotionColors,
  data,
  setData,
  emotions,
  toGraph,
  highlightColor,
  setHighlightColor,
  setOpacity,
  setPop,
  setImageGap,
  setConeHeight,
  setMaxConeGirth,
}) => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gender, setGender] = useState('Both');
  const [filters, setFilters] = useState({
    gender: 0,
    emotions: [],
    ageRange: [],
  });

  const ageKeys = {
    1: 'Less then 20',
    2: '21-22',
    3: '23-24',
    4: '25-26',
    5: '27-28',
    6: '29-30',
    7: 'More than 30',
    '-1': 'Not set',
  };

  const handleSidebarSwitch = () => {
    if (sidebarOpen) setSidebarOpen(false);
    else setSidebarOpen(true);
  };

  useEffect(() => {
    if (sidebarOpen) {
      sidebarRef.current.style.display = 'flex';
      buttonRef.current.style.right = '33rem';
    } else {
      sidebarRef.current.style.display = 'none';
      buttonRef.current.style.right = '-2rem';
    }
  }, [sidebarOpen]);

  useEffect(() => {
    setData(
      data.filter((snip) => {
        if (
          filters.gender !== 0 &&
          snip.Person &&
          +snip.Person.gender !== filters.gender
        ) {
          return false;
        }

        if (
          filters.emotions.length > 0 &&
          snip.Person &&
          !filters.emotions.includes(snip.Person.emotion)
        ) {
          return false;
        }

        if (
          filters.ageRange.length > 0 &&
          snip.Person &&
          !filters.ageRange.includes(+snip.Person.age)
        ) {
          return false;
        }

        return true;
      })
    );
  }, [filters]);

  return (
    <div>
      <div ref={sidebarRef} className={styles.sidebar}>
        <h1>Filters</h1>
        <div className={styles.colorPicker}>
          <label className={styles.oneCol}>
            Positive color
            <input
              type="color"
              defaultValue={emotionColors['positive']}
              onChange={(e) => {
                setEmotionColors({
                  ...emotionColors,
                  positive: e.target.value,
                });
              }}
            />
          </label>

          <label className={styles.oneCol}>
            Neutral color
            <input
              type="color"
              defaultValue={emotionColors['neutral']}
              onChange={(e) => {
                setEmotionColors({
                  ...emotionColors,
                  neutral: e.target.value,
                });
              }}
            />
          </label>

          <label className={styles.oneCol}>
            Positive music color
            <input
              type="color"
              defaultValue={emotionColors['positive_music']}
              onChange={(e) => {
                setEmotionColors({
                  ...emotionColors,
                  positive_music: e.target.value,
                });
              }}
            />
          </label>

          <label className={styles.oneCol}>
            Undefined color
            <input
              type="color"
              defaultValue={emotionColors['undefined']}
              onChange={(e) => {
                setEmotionColors({
                  ...emotionColors,
                  undefined: e.target.value,
                });
              }}
            />
          </label>

          <label className={styles.oneCol}>
            Highlight color
            <input
              type="color"
              defaultValue={highlightColor}
              onChange={(e) => {
                setHighlightColor(e.target.value);
              }}
            />
          </label>
          <label className={styles.oneCol}>
            Images opacity
            <input
              type="range"
              min={0}
              max={1}
              defaultValue={1}
              step={0.05}
              onChange={(e) => {
                setOpacity(e.target.value);
              }}
            />
          </label>
          <label className={styles.oneCol}>
            Path popout
            <input
              type="range"
              min={5}
              max={50}
              defaultValue={10}
              step={0.01}
              onChange={(e) => {
                setPop(e.target.value);
              }}
            />
          </label>
          <label className={styles.oneCol}>
            Image distance
            <input
              type="range"
              min={1}
              max={5}
              defaultValue={3}
              step={0.01}
              onChange={(e) => {
                setImageGap(e.target.value);
              }}
            />
          </label>
          <label className={styles.oneCol}>
            Cone Height
            <input
              type="range"
              min={0}
              max={1}
              defaultValue={0.3}
              step={0.01}
              onChange={(e) => {
                setConeHeight(e.target.value);
              }}
            />
          </label>
          <label className={styles.oneCol}>
            Cone girth
            <input
              type="range"
              min={0.1}
              max={0.5}
              defaultValue={0.1}
              step={0.01}
              onChange={(e) => {
                setMaxConeGirth(e.target.value);
              }}
            />
          </label>
        </div>
        {/* Filtering based on gender */}
        <label>
          <p style={{ fontWeight: 700 }}>Gender</p>
          <div
            onClick={async (e) => {
              switch ((e.target as HTMLInputElement).value) {
                case 'Male':
                  await setFilters({
                    ...filters,
                    gender: 1,
                  });
                  break;
                case 'Female':
                  await setFilters({
                    ...filters,
                    gender: 2,
                  });
                  break;
                case 'Both':
                  await setFilters({ ...filters, gender: 0 });
                  break;
              }
            }}
            defaultValue={'Both'}
          >
            <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" /> Female
            <input
              type="radio"
              value="Both"
              name="gender"
              defaultChecked
            />{' '}
            Both
          </div>
        </label>
        {/* Filtering emotion */}
        <fieldset>
          <legend>Emotions:</legend>
          <label>
            <input
              type="checkbox"
              onClick={() => {
                filters.emotions.includes('1')
                  ? setFilters({
                      ...filters,
                      emotions: filters.emotions.filter(
                        (emotion) => emotion != '1'
                      ),
                    })
                  : setFilters({
                      ...filters,
                      emotions: [...filters.emotions, '1'],
                    });
              }}
            />
            Positive
          </label>
          <label>
            <input
              type="checkbox"
              onClick={() => {
                filters.emotions.includes('2')
                  ? setFilters({
                      ...filters,
                      emotions: filters.emotions.filter(
                        (emotion) => emotion != '2'
                      ),
                    })
                  : setFilters({
                      ...filters,
                      emotions: [...filters.emotions, '2'],
                    });
              }}
            />
            Neutral
          </label>
          <label>
            <input
              type="checkbox"
              onClick={() => {
                filters.emotions.includes('3')
                  ? setFilters({
                      ...filters,
                      emotions: filters.emotions.filter(
                        (emotion) => emotion != '3'
                      ),
                    })
                  : setFilters({
                      ...filters,
                      emotions: [...filters.emotions, '3'],
                    });
              }}
            />
            Positive music
          </label>
        </fieldset>
        {/* Filtering based on age range */}
        <fieldset>
          <legend>Age:</legend>
          {range(7).map((index) => {
            return (
              <label>
                <input
                  type="checkbox"
                  onClick={() => {
                    filters.ageRange.includes(index + 1)
                      ? setFilters({
                          ...filters,
                          ageRange: filters.ageRange.filter(
                            (age) => age != index + 1
                          ),
                        })
                      : setFilters({
                          ...filters,
                          ageRange: [...filters.ageRange, index + 1],
                        });
                  }}
                />
                {ageKeys[index + 1]}
              </label>
            );
          })}
        </fieldset>
        <hr></hr>
        <h1>Existing visualisations</h1>
        <h2>Number of participants with regards to gender and given emotion</h2>
        <BarGraph data={toGraph} />
        <h2>Number of participants in age groups</h2>
        <PieChart data={toGraph} />
        <h2>Average time per emotion</h2>
        <DoughnutGraph data={toGraph} emotionColors={emotionColors} />
        <h2>Average time per gender</h2>
        <PolarChart data={toGraph} />
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

export default Settings;
