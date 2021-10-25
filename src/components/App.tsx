import { Canvas } from '@react-three/fiber';
import Box from './Box';
import styled from 'styled-components';
import 'styled-components/macro';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: blue;
`;

const App: React.FC = () => {
  return (
    <div id="App">
      <Container>
        <Canvas>
          <Box position={[0, 0, 0]} />
        </Canvas>
      </Container>
    </div>
  );
};

export default App;
