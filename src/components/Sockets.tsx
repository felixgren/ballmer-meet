// Herein sockets will lie, better than before, ensured to slay its predecessor.
//@ts-nocheck
import io from 'socket.io-client';

export default function InitSocket(props: boxProps) {
  console.log('init sockets');
  const socket = io('http://localhost:5000');

  let player = {};
  let players = {};

  socket.on('connect', () => {
    socket.on('initNewPlayer', (data, playerCount, remotePlayers) => {
      player.id = data.id;
      console.log(`I am ${socket.id}, the ${playerCount}th player.`);
      players = remotePlayers;

      // Check all that isn't local player
      for (let i = 0; i < playerCount; i++) {
        if (remotePlayers[i] !== player.id) {
          console.log(`${remotePlayers[i]} needs to be added to the world...`);
        }
      }
    });
  });

  socket.on('player connect', (id, playerCount) => {
    console.log(`${id} has connected, there are now ${playerCount} players!`);
    console.log(`I am ${player.id}, and the new player is ${id}`);
  });

  socket.on('player disconnect', (id, playerCount) => {
    console.log(`${id} has left us... there are now ${playerCount} players!`);
  });
  return <></>;
}
