//@ts-nocheck
import { useState } from 'react';
import styles from '../../styles/ControlButtons.module.css';
import Image from 'next/image';
import MicrophoneIcon from '@/img/microphone.png';
import CamIcon from '@/img/cam.png';
import NoMicrophoneIcon from '@/img/mute-microphone.png';
import NoCamIcon from '@/img/mute-cam.png';

const ControlButtons = () => {
  const [camBtnToggled, setCamBtnToggled] = useState(false);
  const [micBtnToggled, setMicBtnToggled] = useState(false);
  return (
    <div className={styles.btnWrapper}>
      <button
        className={styles.toggleWebcam}
        onClick={() => setCamBtnToggled(!camBtnToggled)}
      >
        {camBtnToggled ? (
          <Image
            src={NoCamIcon}
            width="20px"
            height="20px"
            alt="microphone icon"
          />
        ) : (
          <Image
            src={CamIcon}
            width="20px"
            height="20px"
            alt="microphone icon"
          />
        )}
      </button>
      <button
        className={styles.toggleWebcam}
        onClick={() => setMicBtnToggled(!micBtnToggled)}
      >
        {micBtnToggled ? (
          <Image
            src={NoMicrophoneIcon}
            width="20px"
            height="20px"
            alt="microphone icon"
          />
        ) : (
          <Image
            src={MicrophoneIcon}
            width="20px"
            height="20px"
            alt="microphone icon"
          />
        )}
      </button>
    </div>
  );
};

export default ControlButtons;
