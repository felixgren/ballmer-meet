//@ts-nocheck
import { useBox } from '@react-three/cannon';

import AudioEmitter from '@/components/utils/AudioEmitter';
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
        <AudioEmitter url={tune} />
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
  return (
    <group>
      <JukeBox
        position={[1, 5, 55]}
        args={[3, 6, 3]}
        color={'deepskyblue'}
        name={'BALLMER BLASTER'}
        tune={'audio/developers.mp3'}
      />
      <JukeBox
        position={[1, 5, -55]}
        args={[6, 6, 6]}
        color={'orange'}
        name={'Banger'}
        tune={'audio/crazyfrog.mp3'}
      />
    </group>
  );
}
