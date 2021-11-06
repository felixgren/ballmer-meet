import { useState, useEffect } from 'react';

interface IMovement {
  moveForwards: boolean;
  moveBackwards: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  jump: boolean;
}

function movementKeys(key: string) {
  const keys: any = {
    KeyW: 'moveForwards',
    KeyS: 'moveBackwards',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
  };

  return keys[key];
}

export const useKeysToMove = () => {
  const [movement, setMovement] = useState<IMovement>({
    moveForwards: false,
    moveBackwards: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
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
