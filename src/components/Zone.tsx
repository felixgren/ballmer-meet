import { Cylinder } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import Trigger from '@/components/hooks/trigger';

export default function Zone() {
  const [ref] = useCylinder(() => ({ args: [10, 10, 10], type: 'Static' }));
  return (
    <group>
      <mesh position={[-20, 0, -20]} rotation={[-Math.PI / 2, 0, 0]} ref={ref}>
        <Cylinder>
          <Trigger
            onCollide={(e: any) => {
              console.log('Collided 1st cylinder', e);
            }}
          />
          <cylinderGeometry args={[10, 10, 10]} />
          <meshStandardMaterial wireframe color="green" />
        </Cylinder>
      </mesh>

      <mesh position={[20, 0, 20]} rotation={[-Math.PI / 2, 0, 0]} ref={ref}>
        <Cylinder>
          <Trigger
            onCollide={(e: any) => {
              console.log('Collided 2nd cylinder', e);
            }}
          />
          <cylinderGeometry args={[10, 10, 10]} />
          <meshStandardMaterial wireframe color="hotpink" />
        </Cylinder>
      </mesh>
    </group>
  );
}
