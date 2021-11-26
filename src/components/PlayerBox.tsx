// @ts-nocheck
import { useBox } from '@react-three/cannon';
import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Quaternion, Vector3 } from 'three';
import { useKeysToMove } from './hooks/userKeyboard';
import AudioListener from '@/components/utils/AudioListener';
import useStore from '@/components/helpers/store';

const speed: number = 20;
const playerVelocity = new Vector3();
const frontBackVector = new Vector3(0, 0, 1);
const sidesVector = new Vector3(1, 0, 0);
type boxProps = JSX.IntrinsicElements['mesh'];

export default function PlayerBox(props: boxProps) {
  const socket = useStore((state) => state.socket);
  const { camera } = useThree();
  const { keyForward, keyBack, keyLeft, keyRight, keyJump } = useKeysToMove();
  const [ref, api] = useBox(() => ({
    mass: 70,
    args: [1.5, 1.5, 1.5],
    position: [1, 5, 1],
    type: 'Dynamic',
  }));
  const velocity = useRef<number[]>([0, 0, 0]);
  const positionRef = useRef<number[]>([0, 0, 0]);
  const quaternionRef = useRef<number[]>([0, 0, 0]);
  const testQuart = new Quaternion();

  const testQuart2 = testQuart.toArray();

  const mutation = useStore((state) => state.mutation);
  const { ray } = mutation;

  // Velocity Ref
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  // Position Ref
  useEffect(() => {
    api.position.subscribe((v) => (positionRef.current = v));
  }, [api.position]);

  // Quaternion Ref
  useEffect(() => {
    api.quaternion.subscribe((v) => (quaternionRef.current = v));
  }, [api.quaternion]);

  useEffect(() => {
    // console.log('Set boxRef BoxApi states');
    useStore.setState({ boxRef: ref, boxAPI: api });
  }, [ref, api]);

  useFrame(() => {
    console.log(quaternionRef.current);
    // testQuart =
    //   (quaternionRef.current[0],
    //   quaternionRef.current[1],
    //   quaternionRef.current[2],
    //   quaternionRef.current[3]);

    // testQuart2 = testQuart.toArray(testArray);
    // console.log(testQuart);

    //@ts-ignore
    ray.origin.copy(positionRef.current);

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

    socket.emit('updateClientPos', positionRef.current, quaternionRef.current);
  });

  return (
    <mesh {...props} ref={ref} name={'Player'}>
      <AudioListener />
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={'gold'} />
      {/* <Html
        sprite
        transform
        distanceFactor={20}
        position={[2, 10, 0]}
        style={{
          fontSize: '15px',
          padding: '10px 18px',
          color: 'white',
        }}
      >
        <h3>User</h3>
      </Html> */}
    </mesh>
  );
}
