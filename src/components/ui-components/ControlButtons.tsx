//@ts-nocheck
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/ControlButtons.module.css';
import Image from 'next/image';
import MicrophoneIcon from '@/img/microphone.png';
import CamIcon from '@/img/cam.png';
import NoMicrophoneIcon from '@/img/mute-microphone.png';
import NoCamIcon from '@/img/mute-cam.png';

const ControlButtons = () => {
  return (
    <div className={styles.btnWrapper}>
      <button className={styles.toggleWebcam}>
        <Image src={CamIcon} width="20px" height="20px" alt="microphone icon" />
      </button>
      <button className={styles.toggleMicrophone}>
        <Image
          src={MicrophoneIcon}
          width="20px"
          height="20px"
          alt="microphone icon"
        />
      </button>
    </div>
  );
};

export default ControlButtons;
