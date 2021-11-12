//@ts-nocheck
import { useBox } from '@react-three/cannon';
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useKeysToMove } from './hooks/userKeyboard';
import * as THREE from 'three';
import Song from '../audio/Developers.mp3';

function Sound({ url }) {
  const sound = useRef();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  const { camera } = useThree();

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setDistanceModel('linear');
    sound.current.setRolloffFactor(2);
    sound.current.setMaxDistance(20);
    sound.current.setLoop(true);
    sound.current.setVolume(0.6);
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
  }, [buffer, camera, listener]);
  return <positionalAudio ref={sound} args={[listener]} />;
}

const speed: number = 10;
const playerVelocity = new Vector3();
const frontBackVector = new Vector3(0, 0, 1);
const sidesVector = new Vector3(1, 0, 0);
type boxProps = JSX.IntrinsicElements['mesh'];

export default function PlayerBox(props: boxProps) {
  const { camera } = useThree();
  const { keyForward, keyBack, keyLeft, keyRight, keyJump } = useKeysToMove();
  const [ref, api] = useBox(() => ({
    mass: 0.5,
    args: [1.5, 1.5, 1.5],
    position: [1, 5, 1],
    type: 'Dynamic',
  }));
  const velocity = useRef<number[]>([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(() => {
    frontBackVector.set(0, 0, (keyBack ? 1 : 0) - (keyForward ? 1 : 0));
    sidesVector.set((keyLeft ? 1 : 0) - (keyRight ? 1 : 0), 0, 0);

    playerVelocity
      .subVectors(frontBackVector, sidesVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);

    api.velocity.set(playerVelocity.x, velocity.current[1], playerVelocity.z);

    if (keyJump && Math.abs(parseInt(velocity.current[1].toFixed(2))) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
    }
  });

  return (
    <mesh {...props} ref={ref} position={[30, 0, 0]}>
      <Sound url={Song} />
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={'gold'} />
    </mesh>
  );
}
