import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';
import Map from '@/components/Map';
import PlayerBox from '@/components/PlayerBox';
import JukeBoxFactory from '@/components/JukeBoxFactory';
import TriggerZones from '@/components/TriggerZones';
import styles from '../styles/index.module.css';
// import Sockets from '@/components/Sockets';

const Game: React.FC = () => {
  return (
    <div className={styles.container}>
      <Canvas
        className={styles.canvasStyle}
        camera={{ position: [0, 60, 120], fov: 50 }}
      >
        <OrbitControls
        // maxPolarAngle={1.1}
        // minPolarAngle={0.8}
        // minDistance={50}
        // maxDistance={134.16}
        // maxAzimuthAngle={Math.PI / 2}
        // minAzimuthAngle={-Math.PI / 2}
        // rotateSpeed={0.3}
        // enablePan={false}
        />
        <Sky
          sunPosition={[80, 20, -175]}
          distance={600}
          turbidity={10}
          rayleigh={3}
          mieCoefficient={0.005}
          mieDirectionalG={0.69}
          azimuth={180}
        />
        <ambientLight intensity={0.5} position={[160, 10, -200]} />

        <Physics gravity={[0, -30, 0]} iterations={20} tolerance={0}>
          <Map />
          <Debug color="black">
            <PlayerBox />
          </Debug>
          <JukeBoxFactory />
          <TriggerZones />
        </Physics>
        {/* <Sockets /> */}
      </Canvas>
    </div>
  );
};

export default Game;
