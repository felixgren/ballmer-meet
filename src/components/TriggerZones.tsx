import { useCylinder, CylinderProps } from '@react-three/cannon';
import { Color } from 'three';
import useStore from '@/components/helpers/store';

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
      useStore.setState({ showUI: true });
    }
    if (e.type == 'collideEnd') {
      console.log(`${meshName} leaves ${e.target.name}`);
      e.body.material.color.copy(startColor);
      useStore.setState({ showUI: false });
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
        color={'green'}
        name={'green room is great'}
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
        color={'purple'}
        name={'the purple room'}
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
