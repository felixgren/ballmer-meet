//@ts-nocheck
import { useState, useEffect } from 'react';
import styles from '../../styles/ControlButtons.module.css';
import Image from 'next/image';
import MicrophoneIcon from '@/img/microphone.png';
import CamIcon from '@/img/cam.png';
import NoMicrophoneIcon from '@/img/mute-microphone.png';
import NoCamIcon from '@/img/mute-cam.png';
import useStore from '@/components/helpers/store';

const ControlButtons = () => {
  const test = useStore((state) => state.showUI);
  useEffect(() => {
    console.log(test);
  }, [test]);

  const [camBtnToggled, setCamBtnToggled] = useState(false);
  const [micBtnToggled, setMicBtnToggled] = useState(false);
  if (test) {
    return (
      <div className={styles.btnWrapper}>
        <button
          className={styles.toggleWebcam}
          onClick={() => setCamBtnToggled(!camBtnToggled)}
        >
          <Image
            src={camBtnToggled ? NoCamIcon : CamIcon}
            width="20px"
            height="20px"
            alt="webcam icon"
          />
        </button>
        <button
          className={styles.toggleWebcam}
          onClick={() => setMicBtnToggled(!micBtnToggled)}
        >
          <Image
            src={micBtnToggled ? NoMicrophoneIcon : MicrophoneIcon}
            width="20px"
            height="20px"
            alt="webcam icon"
          />
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ControlButtons;
