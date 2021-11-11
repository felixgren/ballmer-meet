import { useCylinder, CylinderProps } from '@react-three/cannon';

interface ZoneProps extends CylinderProps {
  color: string;
}

export default function Zone() {
  // const [ref] = useCylinder(() => ({
  //   isTrigger: true,
  //   args: [10, 10, 10],
  //   type: 'Static',
  // }));

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

    // <group>
    //   <mesh position={[-20, 0, -20]} rotation={[-Math.PI / 2, 0, 0]} ref={ref}>
    //     <Cylinder>
    //       <Trigger
    //         onCollide={(e: any) => {
    //           console.log('Collided 1st cylinder', e);
    //         }}
    //       />
    //       <cylinderGeometry args={[10, 10, 10]} />
    //       <meshStandardMaterial wireframe color="green" />
    //     </Cylinder>
    //   </mesh>

    //   <mesh position={[20, 0, 20]} rotation={[-Math.PI / 2, 0, 0]} ref={ref}>
    //     <Cylinder>
    //       <Trigger
    //         onCollide={(e: any) => {
    //           console.log('Collided 2nd cylinder', e);
    //         }}
    //       />
    //       <cylinderGeometry args={[10, 10, 10]} />
    //       <meshStandardMaterial wireframe color="hotpink" />
    //     </Cylinder>
    //   </mesh>
    // </group>
  );
}
