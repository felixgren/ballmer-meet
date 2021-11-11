import { usePlane, useBox, PlaneProps, BoxProps } from '@react-three/cannon';

// export function Plane() {
//   const [ref] = useBox(() => ({
//     rotation: [-Math.PI / 2, 0, 0],
//     args: [5, 5, 5],
//     position: [0, 0, 0],
//   }));
//   return (
//     <group>
//       <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeBufferGeometry attach="geometry" args={[100, 100]} />
//         <meshLambertMaterial attach="material" color="lightblue" />
//       </mesh>
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -50.1, 0]}>
//         <boxBufferGeometry attach="geometry" args={[100, 100, 100]} />
//         <meshPhongMaterial attach="material" color="hotpink" />
//       </mesh>
//     </group>
//   );
// }

function NewWorld({ args, position }: BoxProps) {
  const [ref] = useBox(() => ({ args, position }));
  return (
    <mesh {...{ position, ref }}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshPhongMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

function GroundPlane({ args, position, rotation }: BoxProps) {
  return (
    <mesh {...{ position, rotation }}>
      <planeGeometry attach="geometry" args={args} />
      <meshPhongMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function FallPlane({ onCollide }: PlaneProps) {
  const [ref] = usePlane(() => ({
    type: 'Static',
    onCollide,
    position: [0, -50, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[200, 200]} />
      <meshPhongMaterial attach="material" color="red" />
    </mesh>
  );
}

export default function Map() {
  return (
    <group>
      <NewWorld args={[100, 100, 100]} position={[0, -50, 0]} />
      <GroundPlane
        args={[100, 100, 100]}
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <FallPlane />
    </group>
  );
}
