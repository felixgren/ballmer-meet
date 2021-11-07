import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Plane from '@/components/Plane';
import Box from '@/components/Box';
import styles from '../styles/index.module.css'

const Game: React.FC = () => {
  return (
    <div className={styles.container}>
        <Canvas>
          <OrbitControls />
          <Sky sunPosition={[100, 20, 100]} />
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
