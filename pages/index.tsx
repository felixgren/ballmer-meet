import type { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import Box from '../components/Box';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
}
body {
background-color: hotpink;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
canvas {
    background-color: blue;
    height: 100vh;
}
`;

const Home: NextPage = () => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>three fiber gang</title>
        <meta name="description" content="Our main page yea..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Canvas>
        <Box position={[0, 0, 0]} />
      </Canvas>
    </>
  );
};

export default Home;
