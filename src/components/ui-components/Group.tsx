import Chat from '@/components/ui-components/Chat';
import Webcams from '@/components/ui-components/Webcams';
import ControlButtons from '@/components/ui-components/ControlButtons';
import useStore from '@/components/helpers/store';
// import { useEffect } from 'react';

const UI = () => {
  // useEffect(() => {
  //   console.log(showUI);
  // }, [showUI]);

  const showUI = useStore((state) => state.showUI);
  return (
    <>
      {<ControlButtons />}
      {showUI && <Webcams />}
      {showUI && <Chat />}
    </>
  );
};

export default UI;
