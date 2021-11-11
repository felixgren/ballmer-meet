import { useCylinder, CylinderProps } from '@react-three/cannon';

interface ZoneProps extends CylinderProps {
  color: string;
}

export default function Zone() {
  function ZoneTrigger({ position, args, color, onCollide }: ZoneProps) {
    const [ref] = useCylinder(() => ({
      isTrigger: true,
      args,
      position,
      onCollide,
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
        onCollide={(e) => {
          console.log('Collision event on red', e);
        }}
      />

      <ZoneTrigger
        position={[-20, 0, -20]}
        args={[10, 10, 10]}
        color={'blue'}
        onCollide={(e) => {
          console.log('Collision event on blue', e);
        }}
      />
    </group>
  );
}
