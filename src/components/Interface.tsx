import { useState } from 'react';
import Webcams from '@/components/ui-components/Webcams';
import ControlButtons from '@/components/ui-components/ControlButtons';
import Chat from '@/components/ui-components/Chat';
import styles from '@/styles/Interface.module.css';

const Interface = () => {
  const [toggleCam, setToggleCam] = useState(false);
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

export default Interface;
