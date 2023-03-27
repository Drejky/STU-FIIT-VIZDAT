import styles from './index.module.css';
import Image from 'next/image';
import { useState, useRef, useEffect, Children } from 'react';

const Sidebar = ({ children, images }) => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const selectRef = useRef(null);
  console.log(images);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sequence, setSequence] = useState('A');
  const [imageList, setImageList] = useState(images[0].order);

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
  };
  return (
    <div>
      <div ref={sidebarRef} className={styles.sidebar}>
        <div className={styles.gallery}>
          <select
            className={styles.select}
            ref={selectRef}
            onChange={selectListener}
          >
            {images.map((seq) => (
              <option value={seq.name}>{seq.name}</option>
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
              <div style={style}>
                <Image
                  src={`/images/${image}.bmp`}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            );
          })}
        </div>
        <div>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              src={`/images/findBanany_obr34.bmp`}
              alt="Picture of the author"
              width={400 * (3 / 2)}
              height={400}
            />
          </div>
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
