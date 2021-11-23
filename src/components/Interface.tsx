import Webcams from '@/components/ui-components/Webcams';
import ControlButtons from '@/components/ui-components/ControlButtons';
import Chat from '@/components/ui-components/Chat';
import styles from '@/styles/Interface.module.css';

const Interface = () => {
  return (
    <div className={styles.interfaceWrapper}>
      <ControlButtons />
      <div className={styles.webcamsWrapper}>
        <Webcams />
      </div>

      <Chat />
    </div>
  );
};

export default Interface;
