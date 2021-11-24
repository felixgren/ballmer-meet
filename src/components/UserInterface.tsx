import { useState } from 'react';
import Webcams from '@/components/ui-components/Webcams';
import ControlButtons from '@/components/ui-components/ControlButtons';
import Chat from '@/components/ui-components/Chat';
import styles from '@/styles/UserInterface.module.css';

const UserInterface = () => {
  const [toggleCam, setToggleCam] = useState(false);
  const amountOfWebcams = 3;
  return (
    <div className={styles.interfaceWrapper}>
      <ControlButtons />
      <div
        className={styles.webcamsWrapper}
        onClick={() => setToggleCam(!toggleCam)}
      >
        {toggleCam ? <Webcams /> : <p>hej</p>}
      </div>

      <Chat />
    </div>
  );
};

export default UserInterface;
