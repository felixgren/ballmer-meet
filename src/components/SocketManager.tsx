/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import { useEffect, useState } from 'react';
import useStore from '@/components/helpers/store';

export default function SocketManager() {
  console.log('SocketManager mounted');
  const socket = useStore((state) => state.socket);
  const player = {};
  const [remotePlayers, setRemotePlayer] = useState([]);

  useEffect(() => {
    socket.emit('initRequest', () => {});
    socket.on('initResponse', (localPlayerID, playerCount, players) => {
      player.id = localPlayerID;
      console.log(player.id);
      console.log(players);
      console.log(`I am ${socket.id}, the ${playerCount}th player.`);
      // Check already connected remote players and add them to clients world
      for (let i = 0; i < playerCount; i++) {
        if (players[i] !== player.id) {
          console.log(`${players[i]} needs to be added`);
          addRemotePlayer(players[i]);
        }
      }
    });
  }, []);

  useEffect(() => {
    socket.on('player-connect', (id, playerCount) => {
      console.log(`player connect, now ${playerCount}`);
      addRemotePlayer(id);
    });
  }, []);

  useEffect(() => {
    socket.on('player-disconnect', (id, playerCount) => {
      console.log(`player disconnect, now ${playerCount}`);
      removeRemotePlayer(id);
    });
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

  // return <></>;

  const playerMeshes = remotePlayers.map((player) => {
    console.log(player.mesh);
    return player.mesh;
  });

  return <group> {playerMeshes} </group>;
}
