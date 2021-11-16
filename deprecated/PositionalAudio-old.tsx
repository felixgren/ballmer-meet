//@ts-nocheck
// Custom Positional audio component

import { useEffect, useRef, useState } from 'react';
import { AudioLoader, AudioListener } from 'three';
import { useLoader } from '@react-three/fiber';
import useStore from '@/components/helpers/store';

export default function PositionalAudio({ url }) {
  const sound = useRef();
  const [listener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, url);
  const playerRef = useStore((state) => state.boxRef);

  useEffect(() => {
    const resumeAudio = () => {
      document.removeEventListener('click', resumeAudio);
      sound.current.play();
      sound.current.context.state == 'running'
        ? console.log('AudioContext start!')
        : console.log(`AudioContext failed, wonder why. ${sound.current}`);
    };
    if (sound.current.context.state === 'suspended') {
      document.addEventListener('click', resumeAudio);
    }
  }, [sound]);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setDistanceModel('linear');
    sound.current.setRolloffFactor(2);
    sound.current.setMaxDistance(100);
    sound.current.setLoop(true);
    sound.current.setVolume(1);
    playerRef && playerRef.current.add(listener);
  }, [buffer, listener, playerRef]);
  return <positionalAudio ref={sound} args={[listener]} />;
}
