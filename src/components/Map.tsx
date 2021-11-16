// @ts-nocheck
import { usePlane, useBox, PlaneProps, BoxProps } from '@react-three/cannon';
import { dispose, useFrame } from '@react-three/fiber';
import useStore from '@/components/helpers/store';
import { useRef } from 'react';
import { useThree } from '@react-three/fiber';

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
  const [ref] = usePlane(() => ({
    type: 'Static',
    onCollide,
    position: [0, -50, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[200, 200]} />
      <meshPhongMaterial attach="material" color="red" />
    </mesh>
  );
}

function RemoveMesh(object?) {
  if (object) {
    console.log('removing');
    object.geometry.dispose();
    object.material.dispose();
    object.parent.remove(object);

    // const object = scene.getObjectByProperty(
    //   'uuid',
    //   respawnPlayer.current.body.uuid
    // );

    // console.log(
    //   `${meshName} fell off, and was deleted. Ever destined to be seen no more`
    // );

    // mesh.geometry.dispose();
    // mesh.material.dispose();

    // object.geometry.dispose();
    // object.material.dispose();
    // dispose(object);
    // scene.remove(object);
    // object.removeFromParent();

    // const mesh = respawnPlayer.current.body;
    // const meshName =
    //   respawnPlayer.current.body.name !== ''
    //     ? respawnPlayer.current.body.name
    //     : 'untitled mesh';

    // const object = scene.getObjectByProperty(
    //   'uuid',
    //   respawnPlayer.current.body.uuid
  }
}

export default function Map() {
  const { scene, gl } = useThree();
  const boxAPI = useStore((state) => state.boxAPI);
  const boxRef = useStore((state) => state.boxRef);
  let respawnPlayer: any = useRef();

  useFrame(() => {
    if (boxAPI && boxRef && respawnPlayer.current) {
      console.log(respawnPlayer.current.body.uuid);
      console.log(boxRef.current.uuid);
      if (respawnPlayer.current.body.uuid === boxRef.current.uuid) {
        console.log('You fell off, respawning player');
        // Generates random numbers between -10 and 10
        const x = Math.floor(Math.random() * 20) - 10;
        const z = Math.floor(Math.random() * 20) - 10;
        boxAPI.position.set(x, 65, z);
      } else {
        console.log(respawnPlayer.current.body);
        respawnPlayer.current.body && RemoveMesh(respawnPlayer.current.body);
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
          console.log(e);
        }}
      />
    </group>
  );
}
