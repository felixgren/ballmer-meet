// @ts-nocheck
import create from 'zustand';
import io from 'socket.io-client';

const useStore = create(() => {
  return {
    socket: io.connect('http://localhost:5000'),
    remotePlayers: [],
    boxRef: null as any,
    boxAPI: null as any,
    showUI: false,
  };
});

export default useStore;
