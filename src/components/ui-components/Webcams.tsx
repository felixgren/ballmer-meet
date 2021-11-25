import React, { useState } from 'react';
import styles from '../../styles/Webcams.module.css';

const Webcams = () => {
  const [toggleCam, setToggleCam] = useState(false);

  return (
    <div>
      <div
        className={styles.webcamsWrapper}
        onClick={() => setToggleCam(!toggleCam)}
      >
        {toggleCam && (
          <div className={styles.webcams}>
            <p className={styles.username}>User</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Webcams;
