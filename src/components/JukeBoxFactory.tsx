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
        position={[0, 80, -55]}
        args={[3, 6, 3]}
        color={'purple'}
        name={'STEVEBOX'}
        tune={'audio/crazyfrog.mp3'}
      />
      {/* <JukeBox
        position={[-20, 80, -40]}
        args={[1.5, 1.5, 1.5]}
        color={'green'}
        name={'JUMPBOX'}
        tune={'audio/quakejump.ogg'}
      /> */}
    </group>
  );
}
