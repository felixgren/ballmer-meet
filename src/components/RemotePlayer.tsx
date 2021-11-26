/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Quaternion, Vector3 } from 'three';
import useStore from '@/components/helpers/store';
import { Html } from '@react-three/drei';

export default function RemotePlayer(id: any, ...props: any) {
  const playerPosition = new Vector3();
  const playerRotation = new Quaternion();
  const playerRef = useRef<any>();
  const socket = useStore((state) => state.socket);

  useFrame(() => {
    playerRef.current.position.copy(playerPosition);
    playerRef.current.quaternion.copy(playerRotation);
  });

  useEffect(() => {
    //@ts-ignore
    socket.on('playerPositions', (remotePlayers) => {
      Object.keys(remotePlayers).forEach((remotePlayer) => {
        if (remotePlayer === id.id) {
          playerPosition.fromArray(remotePlayers[remotePlayer].position);
          playerRotation.fromArray(remotePlayers[remotePlayer].direction);
        }
      });
    });
  }, [socket]);

  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const color = `#${randomColor}`;

  return (
    <mesh {...props} ref={playerRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={color} />
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
