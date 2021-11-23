// Herein sockets will lie, better than before, ensured to slay its predecessor.
//@ts-nocheck
import io from 'socket.io-client';
import RemotePlayer from '@/components/RemotePlayer';
import { useEffect } from 'react';

export default function InitSocket(props: boxProps) {
  console.log('init sockets');
  const socket = io('http://localhost:5000');

  const player = {};
  const remotePlayers = [];
  // let playerMeshes;

  socket.on('connect', () => {
    socket.on('initNewPlayer', (localPlayerID, playerCount, playersIDs) => {
      player.id = localPlayerID.id;
      console.log(`I am ${socket.id}, the ${playerCount}th player.`);
      // Check all connected remote players and add them to clients world.
      for (let i = 0; i < playerCount; i++) {
        if (playersIDs[i] !== player.id) {
          addRemotePlayer(playersIDs[i]);
        }
      }
    });
  });

  function addRemotePlayer(id) {
    console.log(`Adding player.`);
    remotePlayers.push({ id: id, mesh: addPlayerHook() });
    // console.log(remotePlayers);
    // playerMeshes = remotePlayers.map((player) => {
    //   console.log(player.mesh);
    //   return player.mesh;
    // });
    // console.log(playerMeshes);
  }

  function removeRemotePlayer(id) {
    // delete remotePlayers[id];
  }

  socket.on('player connect', (id, playerCount) => {
    console.log('player connect');
    addRemotePlayer(id);
  });

  socket.on('player disconnect', (id, playerCount) => {
    console.log('player disconnect');
    removeRemotePlayer(id);
  });

  function addPlayerHook() {
    let x = Math.floor(Math.random() * 20) - 10;
    return (
      <mesh position={[x, 10, 0]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={0x00ff00} />
      </mesh>
    );
  }

  useEffect(() => {
    console.log('remoteplayers');
    console.log(remotePlayers);
  }, [remotePlayers]);

  return (
    <group>
      <mesh position={[10, 10, 0]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={0x00ff00} />
      </mesh>
      <mesh position={[2, 10, 0]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={0x00ff00} />
      </mesh>
    </group>
  );

  // return (
  //   <group>
  //     {remotePlayers.map((mesh, id) => {
  //       console.log(id);
  //       return (
  //         <mesh key={id} position={[10, 10, 0]}>
  //           <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
  //           <meshStandardMaterial attach="material" color={0x00ff00} />
  //         </mesh>
  //       );
  //     })}
  //   </group>
  // );

  // return remotePlayers.map((player) => {
  //   return player.mesh;
  //   console.log(player.mesh);
  // });

  // return (
  //   <>
  //     <mesh position={[5, 10, 0]}>
  //       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
  //       <meshStandardMaterial attach="material" color={0x00ff00} />
  //     </mesh>
  //   </>
  // );

  // console.log(
  //   `${playersIDs[i]} was already in the world, and needs to be added to yours... `
  // );

  // console.log(`${id} has been removed from remotePlayers object!`);
  // console.log(`${id} has connected, there are now ${playerCount} players!`);
  // console.log(`${id} has left us... there are now ${playerCount} players!`);

  // remotePlayers.map((player) => {
  //   console.log(player.id);
  // });
  // console.log(`${id} has been added to remotePlayers object!`);

  // remotePlayers.map((player) => {
  //   console.log('heyheyhey WAZZA WAZZA WAZZA!');
  //   console.log(player.id);
  //   console.log(player.mesh);
  // });

  // const playerMeshess = remotePlayers.map((player) => {
  //   return player.mesh;
  // });

  // return (<>{hehehoho}</>) as any;

  // const remotePlayersObject = [{}];

  // for (let i = 0; i <= 10; i++) {
  //   remotePlayersObject[i] = {};
  //   remotePlayersObject[i].mesh = <RemotePlayer />;
  // }
  // remotePlayersObject.map((player) => {
  //   console.log(player.mesh);
  // });

  // const remotePlayerMeshes = remotePlayersObject.map((player) => {
  //   return player.mesh;
  // });
}
