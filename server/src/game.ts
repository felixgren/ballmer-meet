// Code from server-wip-base.js

import express, { Application } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';

export class GameServer {
  private httpServer: HTTPServer;
  private app: Application;
  private io: SocketIOServer;
  private readonly dynamicPort = process.env.PORT || 5000;

  // Stores players
  private players: { [id: string]: any } = {};

  private test: string = 'hey there!';

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: '*',
        methods: 'GET, POST',
      },
    });
    this.handleSocketEvents();
    // this.playerData();
  }

  private handleSocketEvents(): void {
    setInterval(() => {
      this.io.sockets.emit('playerPositions', this.players);
    }, 16);

    this.io.on('connection', (socket) => {
      // socket.on('initRequest', () => {
      console.log(`User ${socket.id} connected`);

      // Add to server players object
      this.players[socket.id] = {
        position: [0, 0, 0],
        direction: [0, 0, 0],
      };

      socket.on('clientSaysHello', () => {
        console.log('they are trying to connect.');
        this.io.emit('backendSaysHello', this.test, socket.id);
      });

      socket.on('initRequest', () => {
        console.log(`Sending initResponse to ${socket.id}`);
        // We give newly connected player their ID, playerCount and Players object
        this.io.emit(
          'initResponse',
          { id: socket.id },
          this.io.engine.clientsCount,
          Object.keys(this.players)
        );
      });

      // We give all clients notice of new player and their ID..
      socket.broadcast.emit(
        'player-connect',
        socket.id,
        this.io.engine.clientsCount
      );

      // We give clients notice of disconnection and the their ID
      socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        this.io.emit(
          'player-disconnect',
          socket.id,
          this.io.engine.clientsCount
        );
        // Delete from players object
        delete this.players[socket.id];
      });

      // On chat message emit it to everyone
      socket.on('chat message', (username, message) => {
        this.io.emit('chat message', username, message);
      });

      // Data every client uploads
      socket.on('updateClientPos', (position, direction) => {
        if (this.players[socket.id]) {
          this.players[socket.id].position = position;
          this.players[socket.id].direction = direction;
        }
      });

      // console.log(this.players);
      // });
    });
  }

  public listen(callback: (port: any) => void): void {
    this.httpServer.listen(this.dynamicPort, () => {
      console.log(`Listening on port ${this.dynamicPort}`);
      callback(this.dynamicPort);
    });
  }
}
