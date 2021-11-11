import { useCylinder, CylinderProps } from '@react-three/cannon';
import { useState, useEffect } from 'react';

interface ZoneProps extends CylinderProps {
  color: string;
}

export default function Zone() {
  function setZone(e: any) {
    e.type == 'collideBegin'
      ? console.log('enter zone')
      : e.type == 'collideEnd'
      ? console.log('leave zone')
      : console.log(`Error! unexpected event: ${e.type}`);
  }

  function ZoneTrigger({
    position,
    args,
    color,
    onCollide,
    onCollideBegin,
    onCollideEnd,
  }: ZoneProps) {
    const [ref] = useCylinder(() => ({
      isTrigger: true,
      args,
      position,
      onCollide,
      onCollideBegin,
      onCollideEnd,
    }));
    return (
      <mesh {...{ position, ref }}>
        <cylinderGeometry args={args} />
        <meshStandardMaterial wireframe color={color} />
      </mesh>
    );
  }

  return (
    <group>
      <ZoneTrigger
        position={[20, 0, 20]}
        args={[10, 10, 10]}
        color={'red'}
        onCollideBegin={(e) => {
          console.log('begin collision', e);
        }}
        onCollideEnd={(e) => {
          console.log('end collision', e);
        }}
        onCollide={(e) => {
          console.log('Collision event on red', e);
        }}
      />

      <ZoneTrigger
        position={[-10, 0, -10]}
        args={[10, 10, 10]}
        color={'blue'}
        onCollideBegin={(e) => {
          setZone(e);
        }}
        onCollideEnd={(e) => {
          setZone(e);
        }}
      />
    </group>
  );
}
