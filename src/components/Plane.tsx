import { usePlane } from '@react-three/cannon';

export default function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <group>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshLambertMaterial attach="material" color="lightblue" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -50.1, 0]}>
        <boxBufferGeometry attach="geometry" args={[100, 100, 100]} />
        <meshPhongMaterial attach="material" color="hotpink" />
      </mesh>
    </group>
  );
}
