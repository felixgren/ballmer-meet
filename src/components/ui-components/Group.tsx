import Chat from '@/components/ui-components/Chat';
import Webcams from '@/components/ui-components/Webcams';
import ControlButtons from '@/components/ui-components/ControlButtons';
import useStore from '@/components/helpers/store';
import styles from '@/styles/Ui.module.css';
// import { useEffect } from 'react';

const UI = () => {
  // useEffect(() => {
  //   console.log(showUI);
  // }, [showUI]);

  const showUI = useStore((state) => state.showUI);

  if (!showUI) {
    // pause voice & video
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });
  }

  return (
    <>
      {<ControlButtons />}
      <div className={styles.uiWrapper}>
        {showUI && <Webcams />}
        {showUI && <Chat />}
      </div>
    </>
  );
};

export default UI;
