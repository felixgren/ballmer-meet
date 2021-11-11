import type { CylinderProps } from '@react-three/cannon';
import { useCylinder, Physics } from '@react-three/cannon';
import { useState } from 'react';

function Trigger({ onCollide }: CylinderProps) {
  const [ref] = useCylinder(() => ({
    isTrigger: true,
    onCollide,
  }));
  return <mesh {...{ ref }}></mesh>;
}

export default Trigger;
