import { useState, useCallback } from 'react';

import { Client } from 'colyseus.js';
const client = new Client(`ws://localhost:${process.env.PORT || 3000}`);

export const useRoom = () => {
  const [error, setError] = useState(false);

  const connectToRoom = useCallback(
    async ({ gameId }: { gameId: string }) => {
      try {
        await client.joinOrCreate('game', { gameId });
      } catch (e) {
        console.error('ERROR!', e);
        setError(true);
      }
    },
    [setError]
  );

  return {
    connectToRoom,
    error
  };
};
