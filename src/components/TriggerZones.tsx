import { useCylinder, CylinderProps } from '@react-three/cannon';
import { Color } from 'three';

interface ZoneProps extends CylinderProps {
  color: string;
  name: string;
}

const startColor = new Color();

export default function Zone() {
  // function setZone(e: any) {
  //   e.type == 'collideBegin'
  //     ? console.log(e)
  //     : e.type == 'collideEnd'
  //     ? console.log('leave zone')
  //     : console.log(`Error! unexpected event: ${e.type}`);
  // }

  function setZone(e: any) {
    if (e.type == 'collideBegin') {
      console.log(`You enter ${e.target.name}`);
      startColor.copy(e.body.material.color);
      e.body.material.color.copy(e.target.material.color);
    }
    if (e.type == 'collideEnd') {
      console.log(`You leave ${e.target.name}`);
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
