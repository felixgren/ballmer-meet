// import { Server } from './server';
import { GameServer } from './game';

// const server = new Server();
const server = new GameServer();

server.listen((port: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `Server listening on port ${port} in ${process.env.NODE_ENV} mode`
    );
  } else {
    console.log(`Server is listening on http://localhost:${port}`);
  }
});
