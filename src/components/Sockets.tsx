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

  return <>{playerMeshes}</>;

  // console.log(remotePlayers);
  // const hehe = remotePlayers.map((player) => {
  //   return player.id;
  // });
  // console.log(hehe);
  // return remotePlayers;

  // return (
  //   <group>
  //     <mesh position={[10, 10, 0]}>
  //       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
  //       <meshStandardMaterial attach="material" color={0x00ff00} />
  //     </mesh>
  //     <mesh position={[10, 10, 0]}>
  //       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
  //       <meshStandardMaterial attach="material" color={0x00ff00} />
  //     </mesh>
  //   </group>
  // );

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
