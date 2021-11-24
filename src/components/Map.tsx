// @ts-nocheck
import { usePlane, useBox, PlaneProps, BoxProps } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import useStore from '@/components/helpers/store';
import { useRef } from 'react';

function CubeWorld({ args, position, rotation }: BoxProps) {
  const [ref] = useBox(() => ({ type: 'Static', args, position }));
  return (
    <group>
      <mesh {...{ position, ref }}>
        <boxBufferGeometry attach="geometry" args={args} />
        <meshPhongMaterial attach="material" visible={false} />
      </mesh>
      <mesh {...{ rotation }} position={[0, 0.05, 0]}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshPhongMaterial attach="material" color="#403e4c" />
      </mesh>
    </group>
  );
}

function FallPlane({ onCollide }: PlaneProps) {
  const [ref] = usePlane(() => ({
    type: 'Static',
    onCollide,
    position: [0, -50, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[200, 200]} />
      <meshPhongMaterial attach="material" color="red" visible={false} />
    </mesh>
  );
}

export default function Map() {
  const boxAPI = useStore((state) => state.boxAPI);
  const boxRef = useStore((state) => state.boxRef);
  let respawnPlayer: any = useRef();

  useFrame(() => {
    if (boxAPI && boxRef && respawnPlayer.current) {
      if (respawnPlayer.current.body.uuid === boxRef.current.uuid) {
        console.log('You fell off, respawning player');
        // Generates random numbers between -10 and 10
        const x = Math.floor(Math.random() * 20) - 10;
        const z = Math.floor(Math.random() * 20) - 10;
        boxAPI.position.set(x, 65, z);
      } else {
        console.log(
          `${respawnPlayer.current.body.uuid} collided with the ground`
        );
        respawnPlayer.current.body.visible === true &&
          (respawnPlayer.current.body.visible = false);
      }
      respawnPlayer.current = false;
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
          respawnPlayer.current = e;
        }}
      />
    </group>
  );
}
