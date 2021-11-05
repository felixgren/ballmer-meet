import { Canvas } from '@react-three/fiber';
import Box from './Box';
import Plane from './Plane';
import styled from 'styled-components';
import 'styled-components/macro';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-color: #bb0d0d; */
`;

const App: React.FC = () => {
  return (
    <div id="App">
      <Container>
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
      </Container>
    </div>
  );
};

export default App;
