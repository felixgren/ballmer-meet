import React from 'react';
import Forms from '@/components/splashscreen/Forms';
import styles from '../../styles/SplashScreen.module.css';

const SplashScreen = () => {
  return (
    <div className={styles.wrapper}>
      <Forms />
    </div>
  );
};

export default SplashScreen;
