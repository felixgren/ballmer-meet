import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Quaternion, Vector3 } from 'three';
import useStore from '@/components/helpers/store';
import { Html } from '@react-three/drei';

type boxProps = JSX.IntrinsicElements['mesh'];

export default function RemotePlayer(id: any, ...props: any) {
  const playerPosition = new Vector3();
  const playerRotation = new Quaternion();
  const playerRef = useRef<any>();
  const playerData = useRef<any>();
  const socket = useStore((state) => state.socket);

  useEffect(() => {
    // potential states here...
  }, []);

  useFrame(() => {
    // playerRef.current.position.x = playerPosition.x;
    // playerRef.current.position.y = playerPosition.y;
    // playerRef.current.position.z = playerPosition.z;

    // playerRef.current.quaternion.set(playerRotation);

    playerRef.current.position.copy(playerPosition);
    playerRef.current.quaternion.copy(playerRotation);

    // console.log(playerRef.current.quaternion.copy(playerRotation));

    // console.log(playerRotation);

    // console.log(playerRef.current.position);

    // console.log(playerPosition.x);

    // playerRef.current.position.set(playerPosition);

    // update position and rotation here
    // player.current.position = playerPosition;
    // player.current.rotation = playerRotation;
    //     //@ts-ignore
    // socket.on('playerPositions', (remotePlayers) => {
    //   Object.keys(remotePlayers).forEach((remotePlayer) => {
    //     if (remotePlayer === id.id) {
    //       console.log(remotePlayers[remotePlayer]);
    //     }
    //   });
    // });
    // player.current.position.set(playerPosition);
    // console.log(playerRef.current.position.set([5, 5, 5]));
    // console.log(player.current);
  });

  // const x = Math.floor(Math.random() * 20) - 10;

  useEffect(() => {
    //@ts-ignore
    socket.on('playerPositions', (remotePlayers) => {
      // console.log(players);
      // console.log('hehehe');

      Object.keys(remotePlayers).forEach((remotePlayer) => {
        if (remotePlayer === id.id) {
          // console.log(remotePlayers[remotePlayer].position);

          playerPosition.fromArray(remotePlayers[remotePlayer].position);
          playerRotation.fromArray(remotePlayers[remotePlayer].direction);

          // console.log(remotePlayers[remotePlayer].direction);

          // console.log(playerPosition.current);

          // console.log('found player');
          // console.log(`${remotePlayer} ${id.id}`);
        }
      });
    });
  }, [socket]);

  return (
    <mesh {...props} ref={playerRef}>
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
