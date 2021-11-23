// Herein sockets will lie, better than before, ensured to slay its predecessor.
//@ts-nocheck
import io from 'socket.io-client';
import { useThree } from '@react-three/fiber';
import RemotePlayer from '@/components/RemotePlayer';

export default function InitSocket(props: boxProps) {
  console.log('init sockets');
  const socket = io('http://localhost:5000');

  const player = {};
  const remotePlayers = [{}];

  const get = useThree((state) => state.get);
  console.log(get());

  socket.on('connect', () => {
    socket.on('initNewPlayer', (data, playerCount, playersObject, hello) => {
      player.id = data.id;
      console.log(`I am ${socket.id}, the ${playerCount}th player.`);
      console.log(playersObject);
      console.log(hello);
      // remotePlayers = playersObject;

      // Check all connected remote players and add them to clients world.
      for (let i = 0; i < playerCount; i++) {
        if (playersObject[i] !== player.id) {
          console.log(
            `${playersObject[i]} was already in the world, and needs to be added to yours... `
          );
          addRemotePlayer(playersObject[i]);
        }
      }
    });
  });

  socket.on('player connect', (id, playerCount) => {
    console.log(`${id} has connected, there are now ${playerCount} players!`);
    addRemotePlayer(id);
  });

  socket.on('player disconnect', (id, playerCount) => {
    console.log(`${id} has left us... there are now ${playerCount} players!`);
    removeRemotePlayer(id);
  });

  function addRemotePlayer(id) {
    remotePlayers[id] = {};
    remotePlayers[id].test = 'test';
    remotePlayers[id].mesh = addPlayerHook();
    // remotePlayers[id].mesh = <RemotePlayer id={id} />;
    console.log(remotePlayers);
    console.log(remotePlayers[id].mesh);
    remotePlayers.map((player) => {
      console.log(player.mesh);
    });
    console.log(remotePlayers);
    console.log(`${id} has been added to remotePlayers object!`);
  }

  function removeRemotePlayer(id) {
    delete remotePlayers[id];
    console.log(`${id} has been removed from remotePlayers object!`);
    console.log(remotePlayers);
  }

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

  const realPlayersMesh = remotePlayers.map((player) => {
    return player.mesh;
  });

  remotePlayers.map((player) => {
    console.log(player.mesh);
  });

  return realPlayersMesh as any;

  // return playersObject.map((player) => {
  //   return player.mesh;
  // });
}

function addPlayerHook() {
  let x = Math.floor(Math.random() * 20) - 10;
  return (
    <mesh position={[x, 10, 0]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={0x00ff00} />
    </mesh>
  );
}
