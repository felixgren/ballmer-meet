import { useState, useEffect } from 'react';

interface IMovement {
  keyForward: boolean;
  keyBack: boolean;
  keyLeft: boolean;
  keyRight: boolean;
  keyJump: boolean;
}

function movementKeys(key: string) {
  const keys: any = {
    KeyW: 'keyForward',
    KeyS: 'keyBack',
    KeyA: 'keyLeft',
    KeyD: 'keyRight',
    Space: 'keyJump',
  };

  return keys[key];
}

export const useKeysToMove = () => {
  const [movement, setMovement] = useState<IMovement>({
    keyForward: false,
    keyBack: false,
    keyLeft: false,
    keyRight: false,
    keyJump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      //Movement
      if (movementKeys(e.code)) {
        setMovement((state) => ({
          ...state,
          [movementKeys(e.code) as any]: true,
        }));
      }
    };
    const handleKeyUp = (e: any) => {
      //Movement
      if (movementKeys(e.code)) {
        setMovement((state) => ({
          ...state,
          [movementKeys(e.code) as any]: false,
        }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });
  return movement;
};
