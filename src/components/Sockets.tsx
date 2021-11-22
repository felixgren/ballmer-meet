// Herein sockets will lie, better than before, ensured to slay its predecessor.
//@ts-nocheck
import io from 'socket.io-client';

export default function InitSocket(props: boxProps) {
  console.log('init sockets');
  const socket = io('http://localhost:5000');

  let player = {};
  let remotePlayers = {};

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
  }

  function removeRemotePlayer(id) {
    delete remotePlayers[id];
    console.log(`${id} has been removed from remotePlayers object!`);
    console.log(remotePlayers);
  }

  return <></>;
}
