//@ts-nocheck
import { useEffect, useState } from 'react';
import { useStore } from '@/components/helpers/store';
import RemotePlayer from '@/components/RemotePlayer';

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
        // console.log('nothing');
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

    socket.on('player-disconnect', (id, playerCount) => {
      console.log(`${id} disconnected. There are now ${playerCount} users!`);
      removeRemotePlayer(id);
    });
  }, [socket]);

  function addRemotePlayer(id) {
    console.log(`Adding player: ${id}`);
    setRemotePlayer((remotePlayers) => [
      ...remotePlayers,
      { id: id, mesh: <RemotePlayer id={id} /> },
    ]);
  }

  function removeRemotePlayer(id) {
    console.log(`Removing player: ${id}`);
    setRemotePlayer((remotePlayers) => [
      ...remotePlayers.filter((player) => player.id !== id),
    ]);
  }

  useEffect(() => {
    setMeshes(
      remotePlayers.map((player) => {
        // console.log(`adding mesh: ${player.id}`);
        return player.mesh;
      })
    );
  }, [remotePlayers, socket]);

  return <group> {remoteMeshes} </group>;
}
