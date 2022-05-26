import { Room, Client } from 'colyseus';

export default class GameRoom extends Room {
  // number of clients per room
  maxClients = 2;

  // room has been created: bring your own logic
  // async onCreate(options: Metadata) {}

  // client joined: bring your own logic
  onJoin(client: Client, options: any) {
    console.log(client.id, options, 'joined ChatRoom!');
  }

  // client left: bring your own logic
  // async onLeave(client, consented) {}

  // room has been disposed: bring your own logic
  // async onDispose() {}

  onCreate() {
    console.log('ROOM CREATED!');
  }
}
