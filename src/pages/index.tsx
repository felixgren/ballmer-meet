import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';
import Map from '@/components/Map';
import PlayerBox from '@/components/PlayerBox';
import TriggerZones from '@/components/TriggerZones';
import styles from '../styles/index.module.css';

const Game: React.FC = () => {
  return (
    <div className={styles.container}>
      <Canvas
        className={styles.canvasStyle}
        camera={{ position: [0, 60, 120], fov: 50 }}
      >
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
        <Sky
          sunPosition={[130, 20, -175]}
          distance={700}
          inclination={0.245}
          turbidity={10}
          rayleigh={0.642}
          mieCoefficient={0.005}
          mieDirectionalG={0.9}
          azimuth={0.35}
        />
        <ambientLight intensity={0.5} position={[160, 10, -200]} />

        <Physics gravity={[0, -9.8, 0]} iterations={20} tolerance={0}>
          <Map />
          <Debug color="black">
            <PlayerBox />
          </Debug>
          <TriggerZones />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Game;
