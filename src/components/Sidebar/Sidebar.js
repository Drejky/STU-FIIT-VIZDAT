import styles from './index.module.css';
import { useState, useRef, useEffect } from 'react';

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarSwitch = () => {
    if (sidebarOpen) setSidebarOpen(false);
    else setSidebarOpen(true);
  };

  useEffect(() => {
    if (sidebarOpen) {
      sidebarRef.current.style.display = 'block';
      buttonRef.current.style.left = '33rem';
    } else {
      sidebarRef.current.style.display = 'none';
      buttonRef.current.style.left = '-2rem';
    }
  }, [sidebarOpen]);

  return (
    <div>
      <div ref={sidebarRef} className={styles.sidebar}>
        <p>sdfdfdsfs</p>
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

export default Sidebar;
