import { useEffect, useState } from 'react';

import { Room, LobbyRoom } from 'colyseus';
import { RoomAvailable } from 'colyseus.js';

import { useClient } from './useClient';

export const useLobby = () => {
  const client = useClient();
  const [lobby, setLobby] = useState<Room<LobbyRoom>>();
  const [rooms, setRooms] = useState<RoomAvailable[]>([]);

  useEffect(() => {
    const join = async () => {
      let lobby;
      try {
        lobby = await client.joinOrCreate<LobbyRoom>('lobby');
        // @ts-ignore
        setLobby(lobby);

        lobby.onMessage('rooms', rooms => {
          setRooms(rooms);
        });

        lobby.onMessage('+', ([roomId, room]) => {
          setRooms(prevRooms => {
            if (prevRooms.some(prevRoom => prevRoom.roomId === roomId))
              return prevRooms;

            return [...prevRooms, room];
          });
        });

        lobby.onMessage('-', roomId => {
          setRooms(prevRooms =>
            prevRooms.filter(room => room.roomId !== roomId)
          );
        });
      } catch (e) {
        console.error('Issue in useLobby', e);
        setRooms([]);
      }
    };

    join();
  }, [client]);

  return {
    lobby,
    rooms
  };
};
