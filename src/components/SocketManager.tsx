//@ts-nocheck
import { useEffect, useState } from 'react';
import useStore from '@/components/helpers/store';

export default function SocketManager() {
  console.log('SocketManager mounted');
  const socket = useStore((state) => state.socket);
  // const player = {};

  // const [player, setPlayer] = useState();
  const [remotePlayers, setRemotePlayer] = useState([]);
  const [remoteMeshes, setMeshes] = useState([]);

  // useEffect(() => {
  //   console.log('the player is now...!');
  //   console.log(player);
  //   console.log(socket.id);
  // }, [player, socket]);

  useEffect(() => {
    socket.emit('initRequest', () => {});
    socket.on('initResponse', (localPlayerID, playerCount, players) => {
      // setPlayer(localPlayerID);

      // console.log(player.id);
      // console.log(players);
      console.log(`I am ${socket.id}, the ${playerCount}th player.`);
      // Check already connected remote players and add them to clients world
      for (let i = 0; i < playerCount; i++) {
        if (players[i] !== socket.id) {
          console.log(`${players[i]} needs to be added`);
          console.log(`${socket.id} is me!`);
          addRemotePlayer(players[i]);
        } else if (socket.id === players[i]) {
          console.log(`${socket.id} is local player`);
        }
      }
    });
  }, []);

  useEffect(() => {
    socket.on('player-connect', (id, playerCount) => {
      console.log(`player connect, now ${playerCount}`);
      addRemotePlayer(id);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('player-disconnect', (id, playerCount) => {
      console.log(`player disconnect, now ${playerCount}`);
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

  useEffect(() => {
    setMeshes(
      remotePlayers.map((player) => {
        console.log(`adding mesh: ${player.id}`);
        return player.mesh;
      })
    );
  }, [socket, remotePlayers]);

  return <group> {remoteMeshes} </group>;
}
