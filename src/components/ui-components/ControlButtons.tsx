import { useState } from 'react';
import styles from '../../styles/ControlButtons.module.css';
import Image from 'next/image';
import MicrophoneImage from '@/img/microphone.png';
import CamImage from '@/img/cam.png';
import MuteMicrophoneImage from '@/img/mute-microphone.png';
import MuteCamImage from '@/img/mute-cam.png';

const ControlButtons = () => {
  const [click, setClick] = useState();
  const toggleButton = () => {};

  return (
    <div>
      <button className={styles.toggleWebcam}>
        <Image
          src={CamImage}
          width="20px"
          height="20px"
          alt="microphone icon"
        />
      </button>
      <button className={styles.toggleMicrophone}>
        <Image
          src={MicrophoneImage}
          width="20px"
          height="20px"
          alt="microphone icon"
        />
      </button>
    </div>
  );
};

export default ControlButtons;
