import { useCylinder, CylinderProps } from '@react-three/cannon';
import { Color } from 'three';

interface ZoneProps extends CylinderProps {
  color: string;
  name: string;
}

const startColor = new Color();

export default function Zone() {
  function setZone(e: any) {
    const meshName = e.body.name !== '' ? e.body.name : 'untitled mesh';
    if (e.type == 'collideBegin') {
      console.log(`${meshName} enters ${e.target.name}`);
      startColor.copy(e.body.material.color);
      e.body.material.color.copy(e.target.material.color);
    }
    if (e.type == 'collideEnd') {
      console.log(`${meshName} leaves ${e.target.name}`);
      e.body.material.color.copy(startColor);
    }
  }

  function ZoneTrigger({
    position,
    args,
    color,
    name,
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
      <mesh {...{ position, ref }} name={name}>
        <cylinderGeometry args={args} />
        <meshStandardMaterial wireframe color={color} />
      </mesh>
    );
  }

  return (
    <group>
      <ZoneTrigger
        position={[30, 6, 10]}
        args={[10, 10, 10]}
        color={'red'}
        name={'red room is great'}
        onCollideBegin={(e) => {
          setZone(e);
        }}
        onCollideEnd={(e) => {
          setZone(e);
        }}
      />

      <ZoneTrigger
        position={[-30, 6, 10]}
        args={[10, 10, 10]}
        color={'blue'}
        name={'the blue room'}
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
