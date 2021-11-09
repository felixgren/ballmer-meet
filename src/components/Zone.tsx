import { Circle } from '@react-three/drei';

export default function Zone() {
  return (
    <group>
      <mesh position={[-20, 0.1, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <Circle>
          <circleGeometry args={[6, 6, 6]} />
          <meshPhongMaterial attach="material" color="skyblue" />
        </Circle>
      </mesh>

      <mesh position={[20, 0.1, 20]} rotation={[-Math.PI / 2, 0, 0]}>
        <Circle>
          <circleGeometry args={[6, 6, 6]} />
          <meshPhongMaterial attach="material" color="lightpink" />
        </Circle>
      </mesh>
    </group>
  );
}
