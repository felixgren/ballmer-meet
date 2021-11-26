/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import { useEffect, useState } from 'react';
import useStore from '@/components/helpers/store';

export default function SocketManager() {
  console.log('SocketManager component load/update');
  const socket = useStore((state) => state.socket);

  const [remotePlayers, setRemotePlayer] = useState([]);
  const [remoteMeshes, setMeshes] = useState([]);

  useEffect(() => {
    socket.emit('initRequest', () => {});
    socket.on('initResponse', (localPlayerID, playerCount, players) => {
      if (localPlayerID.id == socket.id) {
        console.log(`I am ${socket.id}, the ${playerCount}th player.`);
        // Check already connected remote players and add them to clients world
        for (let i = 0; i < playerCount; i++) {
          if (players[i] !== socket.id) {
            console.log(`${players[i]} needs to be added`);
            addRemotePlayer(players[i]);
          }
        }
      } else {
        // console.log('nope!');
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('player-connect', (id, playerCount) => {
      console.log(
        `${id} player connected. There are now ${playerCount} users!`
      );
      addRemotePlayer(id);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('player-disconnect', (id, playerCount) => {
      console.log(`${id} disconnected. There are now ${playerCount} users!`);
      removeRemotePlayer(id);
    });
  }, [socket]);

  function addRemotePlayer(id) {
    console.log(`Adding player: ${id}`);
    setRemotePlayer((remotePlayers) => [
      ...remotePlayers,
      { id: id, mesh: addPlayerHook() },
    ]);
  }

  function removeRemotePlayer(id) {
    console.log(`Removing player: ${id}`);
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

  useEffect(() => {
    setMeshes(
      remotePlayers.map((player) => {
        // console.log(`adding mesh: ${player.id}`);
        return player.mesh;
      })
    );
  }, [socket, remotePlayers]);

  return <group> {remoteMeshes} </group>;
}
