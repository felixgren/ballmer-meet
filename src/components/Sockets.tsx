// Herein sockets will lie, better than before, ensured to slay its predecessor.
//@ts-nocheck
import io from 'socket.io-client';
import { useThree } from '@react-three/fiber';

let cubes = {};
export default function InitSocket(props: boxProps) {
  console.log('init sockets');
  const socket = io('http://localhost:5000');

  let player = {};
  let remotePlayers = {};

  //   const test = addPlayerHook();
  //   console.log(test);
  //   addPlayerHook();

  //   for (let i = 0; i < 10; i++) {
  //     addPlayerHook();
  //   }

  // for (let i = 0; i < 10; i++) {
  //   addPlayerHook(i);
  // }
  // console.log(cubes);

  const get = useThree((state) => state.get);
  console.log(get);
  console.log(get());

  socket.on('connect', () => {
    socket.on('initNewPlayer', (data, playerCount, playersObject) => {
      player.id = data.id;
      console.log(`I am ${socket.id}, the ${playerCount}th player.`);
      remotePlayers = playersObject;

      // Check all connected remote players and add them to clients world.
      for (let i = 0; i < playerCount; i++) {
        if (remotePlayers[i] !== player.id) {
          console.log(
            `${remotePlayers[i]} was already in the world, and needs to be added to yours... `
          );
          addRemotePlayer(remotePlayers[i]);
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
    console.log(`${id} has been added to remotePlayers object!`);
    console.log(remotePlayers);
    // addPlayerHook();
  }

  function removeRemotePlayer(id) {
    delete remotePlayers[id];
    console.log(`${id} has been removed from remotePlayers object!`);
    console.log(remotePlayers);
  }

  let x = Math.floor(Math.random() * 20) - 10;
  const playersObject = [{}];
  for (let i = 0; i < 10; i++) {
    playersObject[i] = {};
    playersObject[i].mesh = addPlayerHook();
  }

  console.log(playersObject);

  playersObject.map((player) => {
    console.log(player.mesh);
  });

  return playersObject.map((player) => {
    return player.mesh;
  });
}

function generateCube() {
  return (
    <mesh position={[x, 10, 0]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={0x00ff00} />
    </mesh>
  );
}

function addPlayerHook() {
  let x = Math.floor(Math.random() * 20) - 10;

  // cubes[id] = {};
  // cubes[id].mesh = { generateCube(); };

  return (
    <mesh position={[x, 10, 0]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={0x00ff00} />
    </mesh>
  );
}
