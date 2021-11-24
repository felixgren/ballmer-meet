import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useStore from '@/components/helpers/store';

const playerPosition = new Vector3();
const playerRotation = new Vector3();

type boxProps = JSX.IntrinsicElements['mesh'];

export default function RemotePlayer(props: boxProps) {
  // JESSE, WHAT ARE YOU DOING?
  // Mr. White I'm updating this mesh.
  // JESSE ARE YOU UPDATING THIS MESH USING STATE?
  // Yeaah, I'm sending them down with props.
  // JESSE, We never deal with transient updates like this, use refs!
  // Ok Mr. White, we always want to directly mutate our meshes.

  const player = useRef<any>();

  useEffect(() => {
    // potential states here...
  }, []);

  useFrame(() => {
    // update position and rotation here
    // player.current.position = playerPosition;
    // player.current.rotation = playerRotation;
  });

  const x = Math.floor(Math.random() * 20) - 10;

  return (
    <mesh {...props} ref={player} position={[x, 5, x]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={'gold'} />
    </mesh>
  );
}
