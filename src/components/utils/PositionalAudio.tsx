//@ts-nocheck
// Custom Positional audio component

import { useEffect, useRef, useState } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import useStore from '@/components/helpers/store';
import * as THREE from 'three';

export default function PositionalAudio({ url }) {
  const sound = useRef();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  const { camera } = useThree();
  const boxRef = useStore((state) => state.boxRef);

  const resumeAudio = () => {
    document.removeEventListener('click', resumeAudio);
    sound.current.context.resume();
    console.log('AudioContext resumed');
  };
  if (sound.current && sound.current.context.state === 'suspended') {
    document.addEventListener('click', resumeAudio);
  }

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setDistanceModel('linear');
    sound.current.setRolloffFactor(2);
    sound.current.setMaxDistance(100);
    sound.current.setLoop(true);
    sound.current.setVolume(1);
    sound.current.play();
    if (boxRef) {
      console.log('hello i exist!');
      console.log(boxRef);
      boxRef.current.add(listener);
    }
  }, [buffer, camera, listener, boxRef]);
  return <positionalAudio ref={sound} args={[listener]} />;
}
