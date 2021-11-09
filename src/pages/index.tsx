import { Canvas } from '@react-three/fiber';
import {
  Sky,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Plane from '@/components/Plane';
import Box from '@/components/Box';
import styles from '../styles/index.module.css';
import * as THREE from 'three';

const Game: React.FC = () => {
  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 60, 120], fov: 50 }}>
        {/* <OrthographicCamera makeDefault position={[0, 50, 90]} zoom={[15]}>
          <mesh />
        </OrthographicCamera> */}

        {/* <PerspectiveCamera makeDefault position={[0, 50, 90]}>
          <mesh />
        </PerspectiveCamera> */}

        <OrbitControls />
        <Sky sunPosition={[160, 10, -200]} distance={700} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Physics gravity={[0, -30, 0]}>
          <Box />
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Game;
