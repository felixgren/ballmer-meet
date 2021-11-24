import { useCylinder, CylinderProps } from '@react-three/cannon';
import { Color } from 'three';
import Chat from '@/components/ui-components/Chat';
import ControlButtons from '@/components/ui-components/ControlButtons';
import Webcams from '@/components/ui-components/Webcams';
import { useBowser, useBowserUpdate } from '@/components/BowserContext';
import { useEffect, useRef } from 'react';
import useStore from '@/components/helpers/store';

interface ZoneProps extends CylinderProps {
  color: string;
  name: string;
}

const startColor = new Color();

// @ts-ignore
export default function Zone() {
  // const testtest = useRef(setPopupState);
  const isEvil = useBowser();
  const setEvil = useBowserUpdate();

  // useEffect(() => {
  // setPopupState(true);
  // console.log(showPopup);
  //   const hello = setPopupState;
  // }, [setPopupState, showPopup]);

  // useEffect(() => {
  //   setEvil(true);
  // }, [isEvil, setEvil]);

  useEffect(() => {
    // console.log('Set boxRef BoxApi states');
    // useStore.setState({ showUI: true });
  }, []);

  function setZone(e: any) {
    const meshName = e.body.name !== '' ? e.body.name : 'untitled mesh';
    if (e.type == 'collideBegin') {
      console.log(`${meshName} enters ${e.target.name}`);
      startColor.copy(e.body.material.color);
      e.body.material.color.copy(e.target.material.color);
      console.log('I wish bowser would add the UI back');
      useStore.setState({ showUI: true });

      // console.log(isEvil);
      // setPopupState(false);
    }
    if (e.type == 'collideEnd') {
      console.log(`${meshName} leaves ${e.target.name}`);
      e.body.material.color.copy(startColor);
      useStore.setState({ showUI: false });
      // setEvil(false);
      // console.log(isEvil);
    }
  }

  // useEffect(() => {
  //   console.log(isEvil);
  // }, [isEvil]);

  function ZoneTrigger({
    position,
    args,
    color,
    name,
    onCollide,
    onCollideBegin,
    onCollideEnd,
  }: ZoneProps) {
    const [ref] = useCylinder(() => ({
      isTrigger: true,
      args,
      position,
      onCollide,
      onCollideBegin,
      onCollideEnd,
    }));
    return (
      <mesh {...{ position, ref }} name={name}>
        <cylinderGeometry args={args} />
        <meshStandardMaterial wireframe color={color} />
      </mesh>
    );
  }

  return (
    <group>
      {/* <ControlButtons /> */}
      {/* <Webcams /> */}
      {/* <Chat /> */}
      <ZoneTrigger
        position={[30, 6, 10]}
        args={[10, 10, 10]}
        color={'green'}
        name={'green room is great'}
        onCollideBegin={(e) => {
          setZone(e);
        }}
        onCollideEnd={(e) => {
          setZone(e);
        }}
      />

      <ZoneTrigger
        position={[-30, 6, 10]}
        args={[10, 10, 10]}
        color={'purple'}
        name={'the purple room'}
        onCollideBegin={(e) => {
          setZone(e);
          // setPopupState(true);
        }}
        onCollideEnd={(e) => {
          setZone(e);
          // setPopupState(false);
        }}
      />
    </group>
  );
}
