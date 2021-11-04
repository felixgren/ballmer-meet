import { useBox } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeysToMove } from './hooks/userKeyboard';

type boxProps = JSX.IntrinsicElements['mesh'];

export default function Box(props: boxProps) {
  const [ref] = useBox(() => ({
    mass: 0.5,
    args: [1.5, 1.5, 1.5],
    position: [1, 5, 1],
  }));

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  );
}
