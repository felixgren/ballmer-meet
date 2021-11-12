import {
  usePlane,
  useBox,
  PlaneProps,
  BoxProps,
  Physics,
} from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import useStore from '@/components/helpers/store';

function CubeWorld({ args, position, rotation }: BoxProps) {
  const [ref] = useBox(() => ({ type: 'Static', args, position }));
  return (
    <group>
      <mesh {...{ position, ref }}>
        <boxBufferGeometry attach="geometry" args={args} />
        <meshPhongMaterial attach="material" color="lightblue" />
      </mesh>
      <mesh {...{ rotation }} position={[0, 0.05, 0]}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshPhongMaterial attach="material" color="hotpink" />
      </mesh>
    </group>
  );
}

function FallPlane({ onCollide }: PlaneProps) {
  const [ref, api] = usePlane(() => ({
    type: 'Static',
    onCollide,
    position: [0, -50, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));
  // console.log(api);
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[200, 200]} />
      <meshPhongMaterial attach="material" color="red" />
    </mesh>
  );
}

function RespawnPlayer(e: any) {
  // console.log(e);
  // const dumbApi = useStore((state) => state.dumbApi);
  // console.log(dumbApi);
  // return dumbApi.setState({
  //   player: {
  //     position: [0, 0, 0],
  //     rotation: [0, 0, 0],
  //   },
  // });
}

export default function Map() {
  const dumbApi = useStore((state) => state.dumbApi);
  console.log(dumbApi);
  if (dumbApi) {
    console.log(dumbApi);
  }
  useFrame(() => {
    if (dumbApi) {
      dumbApi.position.set(0, 0, 0);
    }
  });

  return (
    <group>
      <CubeWorld
        args={[100, 100, 100]}
        position={[0, -50, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <FallPlane
        onCollide={(e) => {
          RespawnPlayer(e);
        }}
      />
    </group>
  );
}
