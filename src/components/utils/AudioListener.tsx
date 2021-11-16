//@ts-nocheck
// Custom PositionalListener

import { useEffect, useState } from 'react';
import { AudioListener as ThreeListener } from 'three';
import useStore from '@/components/helpers/store';

export default function AudioListener() {
  const [listener] = useState(() => new ThreeListener());
  const playerRef = useStore((state) => state.boxRef);
  useEffect(() => {
    playerRef && playerRef.current.add(listener);
  }, [playerRef, listener]);
  return <positionalAudio args={[listener]} />;
}
