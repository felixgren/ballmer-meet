//@ts-nocheck
import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import io from 'socket.io-client';
import * as THREE from 'three';

let player = {};
let remotePlayers = {};

export default function InitSocket(props: boxProps) {
  console.log('init sockets');
  const socket = io('http://localhost:5000');
  const { scene } = useThree();

  socket.on('connect', () => {
    socket.on('initPlayer', (data, playerCount, remotePlayers) => {
      player.id = data.id;
      console.log(`I am ${socket.id}, the ${playerCount}th player.`);

      // Check all that isn't local player
      for (let i = 0; i < playerCount; i++) {
        if (remotePlayers[i] !== player.id) {
          console.log(`${remotePlayers[i]} needs to be added to the world...`);
          InitRemotePlayer(remotePlayers[i], scene);
        }
      }
    });
  });

  useEffect(() => {}, []);

  useFrame(() => {});

  return <></>;
}

function initLocalPlayer() {}

function InitRemotePlayer(playerID, scene) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  material.color = new THREE.Color(0x000000);

  const x = Math.floor(Math.random() * 20) - 10;
  const y = Math.floor(Math.random() * 20) - 10;
  const z = Math.floor(Math.random() * 20) - 10;

  const remotePlayer = new THREE.Mesh(geometry, material);
  remotePlayer.position.set(x, y, z);

  scene.add(remotePlayer);

  remotePlayers[playerID] = {};
  remotePlayers[playerID].mesh = remotePlayer;
  remotePlayers[playerID].positionSync = new THREE.Vector3();
  remotePlayers[playerID].lookDirection = new THREE.Vector3();

  console.log(`${playerID} added to the scene!`);
}

export function InitRemotePlayerTest(id) {
  const x = Math.floor(Math.random() * 20) - 10;
  const y = Math.floor(Math.random() * 20) - 10;
  const z = Math.floor(Math.random() * 20) - 10;
  return (
    <mesh position={[x, y, z]}>
      <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <meshBasicMaterial attach="material" color={0x000000} />
    </mesh>
  );
}

function deleteRemotePlayer(id) {}

function updateRemotePlayers(remotePlayers) {}

function uploadMovementData() {}
