import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls, SpotLight } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';
import Map from '@/components/Map';
import PlayerBox from '@/components/PlayerBox';
import JukeBoxFactory from '@/components/JukeBoxFactory';
import TriggerZones from '@/components/TriggerZones';
import styles from '../styles/index.module.css';
import Sockets from '@/components/Sockets';
import UI from '@/components/ui-components/Group';

const Game: React.FC = () => {
  return (
    <div className={styles.container}>
      <UI />
      <Canvas camera={{ position: [0, 60, 120], fov: 50 }}>
        <OrbitControls
        // maxPolarAngle={1.1}
        // minPolarAngle={0.8}
        // minDistance={50}
        // maxDistance={134.16}
        // minAzimuthAngle={-Math.PI / 2}
        // rotateSpeed={0.3}
        // enablePan={false}
        // enableRotate={false}
        />
        <Sky
          sunPosition={[10, 10, -120]}
          distance={450}
          rayleigh={3}
          mieCoefficient={0.05}
          mieDirectionalG={0.7}
        />
        <ambientLight intensity={0.6} position={[160, 10, -200]} />

        <Physics gravity={[0, -30, 0]} iterations={20} tolerance={0}>
          <Map />
          <Debug color="black">
            <PlayerBox />
          </Debug>
          <JukeBoxFactory />
          <TriggerZones />
        </Physics>
        <Sockets />
      </Canvas>
    </div>
  );
};

export default Game;