import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Plane from '@/components/Plane';
import Box from '@/components/Box';
import Zone from '@/components/Zone';
import styles from '../styles/index.module.css';

const Game: React.FC = () => {
  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 60, 120], fov: 50 }}>
        <OrbitControls
          maxPolarAngle={1.1}
          minPolarAngle={0.8}
          minDistance={50}
          maxDistance={134.16}
          maxAzimuthAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
          rotateSpeed={0.3}
          enablePan={false}
        />
        <Sky sunPosition={[160, 10, -200]} distance={700} />
        <ambientLight intensity={0.5} position={[160, 10, -200]} />

        <Physics gravity={[0, -30, 0]}>
          <Box />
          <Zone />
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Game;
