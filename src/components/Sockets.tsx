/* eslint-disable react-hooks/exhaustive-deps */
// Herein sockets will lie, better than before, ensured to slay its predecessor.
//@ts-nocheck
import io from 'socket.io-client';
import RemotePlayer from '@/components/RemotePlayer';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:5000'); // haha you can't be in component with updating state...

export default function InitSocket() {
  console.log('init sockets');
  const player = {};
  const [remotePlayers, setRemotePlayer] = useState([]);
  useEffect(() => {
    socket.on('connect', () => {
      socket.on('initNewPlayer', (localPlayerID, playerCount, players) => {
        player.id = localPlayerID.id;
        console.log(`I am ${socket.id}, the ${playerCount}th player.`);
        console.log(` i am ${localPlayerID}`);
        // Check already connected remote players and add them to clients world
        console.log();
        for (let i = 0; i < playerCount; i++) {
          if (players[i] !== player.id) {
            console.log('needs to be added');
            addRemotePlayer(players[i]);
          }
        }
      });
    });
    return () => {
      socket.off('connect', () => {});
      socket.off('initNewPlayer', () => {});
    };
  }, []);

  useEffect(() => {
    socket.on('player connect', (id, playerCount) => {
      console.log(`player connect but inside!!!, now ${playerCount}`);
      addRemotePlayer(id);
    });
    return () => {
      socket.off('player connect', () => {});
    };
  }, []);

  useEffect(() => {
    socket.on('player disconnect', (id, playerCount) => {
      console.log(`player disconnect, now ${playerCount}`);
      removeRemotePlayer(id);
    });
    return () => {
      socket.off('player disconnect', () => {});
    };
  }, []);

  function addRemotePlayer(id) {
    console.log(`Adding player: ${id}`);
    setRemotePlayer((remotePlayers) => [
      ...remotePlayers,
      { id: id, mesh: addPlayerHook() },
    ]);
  }

  function removeRemotePlayer(id) {
    console.log(`Remove player: ${id}`);
    setRemotePlayer((remotePlayers) => [
      ...remotePlayers.filter((player) => player.id !== id),
    ]);
    // let filtered = remotePlayers.filter((player) => player.id !== id);
    // setRemotePlayer(filtered);
  }

  function addPlayerHook() {
    let y = Math.floor(Math.random() * 20) - 10;
    let x = Math.floor(Math.random() * 20) - 10;
    return (
      <mesh position={[x, 10, y]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={0x00ff00} />
      </mesh>
    );
  }

  const playerMeshes = remotePlayers.map((player) => {
    console.log(player.mesh);
    return player.mesh;
  });

  return <group> {playerMeshes} </group>;
}
