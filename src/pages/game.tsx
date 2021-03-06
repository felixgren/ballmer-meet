import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Map from '@/components/WorldMap';
import LocalPlayer from '@/components/LocalPlayer';
import JukeBoxFactory from '@/components/JukeBoxFactory';
import TriggerZones from '@/components/TriggerZones';
import styles from '../styles/index.module.css';
import SocketManager from '@/components/SocketManager';
import UI from '@/components/ui-components/Group';

const Game: React.FC = () => {
  return (
    <div className={styles.container}>
      <UI />
      <Canvas shadows camera={{ position: [0, 60, 120], fov: 50 }}>
        <OrbitControls
          maxPolarAngle={1.4}
          minPolarAngle={0.8}
          minDistance={50}
          maxDistance={134.16}
          maxAzimuthAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
          rotateSpeed={0.3}
        />
        <Sky
          sunPosition={[130, 10, -175]}
          distance={600}
          turbidity={2.5}
          rayleigh={0.2}
          mieCoefficient={0.006}
          mieDirectionalG={0.9}
          azimuth={0.35}
        />
        <ambientLight intensity={0.6} position={[160, 10, -200]} />
        <Physics gravity={[0, -30, 0]} iterations={20} tolerance={0}>
          <Map />
          <LocalPlayer />
          <JukeBoxFactory />
          <TriggerZones />
        </Physics>
        <SocketManager />
      </Canvas>
    </div>
  );
};

export default Game;
