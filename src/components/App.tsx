import { Canvas } from '@react-three/fiber';
import Box from './Box';
import styled from 'styled-components';
import 'styled-components/macro';
import { OrbitControls, Plane } from '@react-three/drei';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f1f0f0;
`;

const App: React.FC = () => {
  return (
    <div id="App">
      <Container>
        <Canvas camera={{ position: [20, 20, 20] }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Box position={[1, 1, 1]} scale={[5, 1, 1]} />
          <Plane
            position={[0, 0, 0]}
            rotation-x={Math.PI / -2}
            args={[100, 100, 4, 4]}
          >
            <meshPhongMaterial attach="material" />
          </Plane>
        </Canvas>
      </Container>
    </div>
  );
};

export default App;
