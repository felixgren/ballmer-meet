//@ts-nocheck
import { useBox } from '@react-three/cannon';
import { Html } from '@react-three/drei';
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
        <Html
          sprite
          transform
          distanceFactor={20}
          position={[2, 10, 0]}
          style={{
            fontSize: '35px',
            padding: '10px 18px',
          }}
        >
          <h1>Bangers</h1>
        </Html>
      </mesh>
    );
  }
  return (
    <group>
      <JukeBox
        position={[0, 60, -55]}
        args={[6, 6, 6]}
        color={'purple'}
        name={'STEVEBOX'}
        tune={'audio/crazyfrog.mp3'}
      />
      {/* <JukeBox
        position={[0, 60, 55]}
        args={[6, 6, 6]}
        color={'green'}
        name={'JUMPBOX'}
        tune={'audio/quakejump.ogg'}
      /> */}
    </group>
  );
}
