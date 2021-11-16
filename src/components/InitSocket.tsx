//@ts-nocheck
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import io from 'socket.io-client';

export default function InitSocket(props: boxProps) {
  console.log('init sockets');
  const socket = io('http://localhost:5000');

  let player = {};
  let remotePlayers = {};

  socket.on('connect', () => {
    socket.on('initPlayer', (data, playerCount, remotePlayers) => {
      player.id = data.id;
      console.log(`I am ${socket.id}, the ${playerCount}th player.`);

      // Check all that isn't local player
      for (let i = 0; i < playerCount; i++) {
        if (remotePlayers[i] !== player.id) {
          console.log(`${remotePlayers[i]} needs to be added to the world...`);
          initRemotePlayer(remotePlayers[i]);
        }
      }
    });
  });

  useEffect(() => {}, []);

  useFrame(() => {});

  return <></>;
}

function initLocalPlayer() {}

function initRemotePlayer(id) {}

function deleteRemotePlayer(id) {}

function updateRemotePlayers(remotePlayers) {}

function uploadLocalPlayer() {}
