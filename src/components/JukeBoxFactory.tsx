//@ts-nocheck
import { useBox } from '@react-three/cannon';
import Positional2 from '@/components/utils/Positional2';
type boxProps = JSX.IntrinsicElements['mesh'];

export default function JukeBoxFactory(props: boxProps) {
  function JukeBox({ position, args, color, name, tune }: BoxProps) {
    const [ref] = useBox(() => ({
      args,
      position,
      mass: 70,
      type: 'Dynamic',
    }));
    return (
      <mesh {...{ position, ref }} name={name}>
        <Positional2 url={tune} />
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
  return (
    <group>
      <JukeBox
        position={[0, 50, -40]}
        args={[1.5, 1.5, 1.5]}
        color={'red'}
        name={'yeas'}
        tune={'audio/developers.mp3'}
      />
      <JukeBox
        position={[0, 50, 40]}
        args={[1.5, 1.5, 1.5]}
        color={'green'}
        name={'green'}
        tune={'audio/quakejump.ogg'}
      />
    </group>
  );
}
