// @ts-nocheck
// The following code is not typed

// The prettier config used in three-arena looked pretty sweet, should consider it here

function initPlayer() {
  this.playerVelocity = new THREE.Vector3();
  this.playerDirection = new THREE.Vector3();
  this.upVector = new THREE.Vector3(0, 1, 0);

  // https://wickedengine.net/2020/04/26/capsule-collision-detection/
  this.playerCapsule = new Capsule(
    new THREE.Vector3(),
    new THREE.Vector3(0, 2, 0),
    0.5
  );

  this.triggerRespawn();
  this.playerCapsule.translate(this.teleportVec.set(0, 100, 0));

  console.log('init player');
}

function initRemotePlayer(playerID) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  material.color = new THREE.Color(0x000000);

  const remotePlayer = new THREE.Mesh(geometry, material);
  remotePlayer.position.set(0, 0, 0);

  this.scene.add(remotePlayer);

  this.players[playerID] = {};
  this.players[playerID].mesh = remotePlayer;
  this.players[playerID].positionSync = new THREE.Vector3();
  this.players[playerID].lookDirection = new THREE.Vector3();

  console.log(`${playerID} added to the scene!`);
  console.log(this.players);
}

function deleteRemotePlayer(playerID) {
  this.scene.remove(this.players[playerID].mesh);
  delete this.players[playerID];
  console.log(this.players);
}

function updateRemotePlayers(remotePlayers) {
  for (let id in remotePlayers) {
    if (id != this.player.id) {
      // Should not forget to reuse vectors
      this.players[id].positionSync = new THREE.Vector3().fromArray(
        remotePlayers[id].position
      );
      this.players[id].lookDirection = new THREE.Vector3().fromArray(
        remotePlayers[id].direction
      );

      // Set player position
      this.players[id].mesh.position.set(
        this.players[id].positionSync.x,
        this.players[id].positionSync.y,
        this.players[id].positionSync.z
      );

      // Set head rotation
      this.players[id].mesh.rotation.y = this.players[id].lookDirection.x;
      this.players[id].mesh.rotation.x = this.players[id].lookDirection.y;
    }
  }
}

function uploadMovementData() {
  this.socket.emit(
    'updateClientPos',
    [
      this.playerCapsule.end.x,
      this.playerCapsule.end.y,
      this.playerCapsule.end.z,
    ],
    this.lookVector().toArray()
  );
}

export default function initSocket() {
  console.log('init socket');
  this.socket = io('https://arenaserver.herokuapp.com/');

  this.player = {};
  this.players = {};

  this.socket.on('connect', () => {
    this.socket.on('initPlayer', (data, playerCount, playerIDs) => {
      this.player.id = data.id;
      console.log(`I am ${this.socket.id}, the ${playerCount}th player.`);

      // Check all that isn't local player
      for (let i = 0; i < playerCount; i++) {
        if (playerIDs[i] !== this.player.id) {
          console.log(`${playerIDs[i]} needs to be added to the world...`);
          this.initRemotePlayer(playerIDs[i]);
        }
      }
    });
  });

  this.socket.on('playerPositions', (players) => {
    this.updateRemotePlayers(players);
  });

  this.socket.on('player connect', (playerId, playerCount) => {
    console.log(`${playerId} joined the session!`);
    console.log(`There are now ${playerCount} players`);
    if (playerId !== this.player.id) {
      console.log(`${playerId} needs to be added to the world...`);
      this.initRemotePlayer(playerId);
    }
    this.addStatusMessage(playerId, 'join');
  });

  this.socket.on('player disconnect', (playerId, playerCount) => {
    this.deleteRemotePlayer(playerId);
    console.log(`${playerId} has left us...`);
    console.log(`There are now ${playerCount} players`);
    this.addStatusMessage(playerId, 'leave');
  });

  this.socket.on('connect', () => {
    this.socket.on('chat message', (username, message) => {
      this.addChatMessage(username, message);
    });
  });

  this.socket.on('shootSyncRocket', (playerData, playerID) => {
    this.shootRemoteRocket(playerData, playerID);
  });

  this.socket.on('kill message', (shooter, killed) => {
    if (shooter) {
      this.addKillMessage(shooter, killed);
    } else {
      this.addKillMessage(killed);
    }
  });
}
