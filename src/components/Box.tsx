import { useBox } from '@react-three/cannon';
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useKeysToMove } from './hooks/userKeyboard';

const speed: number = 5;
type boxProps = JSX.IntrinsicElements['mesh'];

export default function Box(props: boxProps) {
  const { camera } = useThree();
  const { moveForwards, moveBackwards, moveLeft, moveRight, jump } =
    useKeysToMove();
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
    const moveTo = new Vector3();
    const moveToFrontOrBackVector = new Vector3(
      0,
      0,
      (moveBackwards ? 1 : 0) - (moveForwards ? 1 : 0)
    );

    const moveToSideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    moveTo
      .subVectors(moveToFrontOrBackVector, moveToSideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);

    api.velocity.set(moveTo.x, velocity.current[1], moveTo.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
    }
  });

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  );
}
