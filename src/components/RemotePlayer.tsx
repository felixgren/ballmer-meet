import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useStore from '@/components/helpers/store';
import { Html } from '@react-three/drei';

const playerPosition = new Vector3();
const playerRotation = new Vector3();

type boxProps = JSX.IntrinsicElements['mesh'];

export default function RemotePlayer(id: any, ...props: any) {
  const player = useRef<any>();
  const socket = useStore((state) => state.socket);

  useEffect(() => {
    // potential states here...
  }, []);

  useFrame(() => {
    // update position and rotation here
    // player.current.position = playerPosition;
    // player.current.rotation = playerRotation;
  });

  const x = Math.floor(Math.random() * 20) - 10;

  useEffect(() => {
    //@ts-ignore
    socket.on('playerPositions', (remotePlayers) => {
      // console.log(players);
      // console.log('hehehe');

      Object.keys(remotePlayers).forEach((remotePlayer) => {
        // console.log(player);
        if (remotePlayer === id.id) {
          // console.log('found player');
          // console.log(`${player} ${id.id}`);
        }
      });
      // console.log(id.id);
      //@ts-ignore
      //  players.filter((player) => player.id !== id);
    });
  }, [socket]);

  return (
    <mesh {...props} ref={player} position={[x, 5, x]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={'gold'} />
      <Html
        name="html"
        transform
        center
        distanceFactor={20}
        position={[0, 5, 0]}
        style={{
          fontSize: '14px',
          padding: '10px 18px',
          color: 'white',
        }}
      >
        <h1>{id.id}</h1>
      </Html>
    </mesh>
  );
}
