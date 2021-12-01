// @ts-nocheck
import create from 'zustand';
import io from 'socket.io-client';
import * as THREE from 'three';

export const debug = false as const;
const booleans = [
  'debug',
  'editor',
  'help',
  'leaderboard',
  'map',
  'ready',
  'shadows',
  'sound',
  'stats',
] as const;

const useStore = create((set, get) => {
  return {
    socket: io.connect('http://localhost:5000'),
    remotePlayers: [],
    boxRef: null as any,
    boxAPI: null as any,
    showUI: false,
    x: 0,
    debug,

    mutation: {
      ray: new THREE.Ray(),
    },
  };
});

export { useStore };
