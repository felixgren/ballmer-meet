//@ts-nocheck
// Custom PositionalAudio

import { useEffect, useRef, useState } from 'react';
import { AudioLoader, AudioListener } from 'three';
import { useLoader } from '@react-three/fiber';

export default function AudioEmitter({ url }) {
  const sound = useRef();
  const [listener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, url);

  useEffect(() => {
    const resumeAudio = () => {
      document.removeEventListener('click', resumeAudio);
      sound.current.play();
      sound.current.context.state == 'running'
        ? console.log('AudioContext start!')
        : console.log(`AudioContext failed, wonder why. ${sound.current}`);
    };
    if (sound.current.context.state === 'suspended' || 'running') {
      document.addEventListener('click', resumeAudio);
      document.addEventListener('click', resumeAudio);
    } else {
      console.log(
        `AudioContext unhandled state: ${sound.current.context.state}`
      );
    }
  }, [sound]);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(10);
    sound.current.setDistanceModel('exponential');
    sound.current.setRolloffFactor(6);
    sound.current.setMaxDistance(100);
    sound.current.setLoop(true);
    sound.current.setVolume(0.5);
  }, [buffer, listener]);
  return <positionalAudio ref={sound} args={[listener]} />;
}
