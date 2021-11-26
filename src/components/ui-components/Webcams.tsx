import React from 'react';
import styles from '../../styles/Webcams.module.css';

const Webcams = () => {
  return (
    <div>
      <div className={styles.webcamsWrapper}>
        <div className={styles.webcams}>
          <p className={styles.username}>User</p>
        </div>
        <div className={styles.webcams}>
          <p className={styles.username}>User</p>
        </div>
        <div className={styles.webcams}>
          <p className={styles.username}>User</p>
        </div>
      </div>
    </div>
  );
};

export default Webcams;
