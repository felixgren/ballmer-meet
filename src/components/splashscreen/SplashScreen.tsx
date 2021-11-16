import React from 'react';
import Forms from '@/components/splashscreen/Forms';
import Logo from '@/components/splashscreen/Logo';
import styles from '../../styles/splashScreen.module.css';

const SplashScreen = () => {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <Forms />
    </div>
  );
};

export default SplashScreen;
