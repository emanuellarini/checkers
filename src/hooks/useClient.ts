import { useMemo } from 'react';

import { Client } from 'colyseus.js';

export const useClient = () => {
  return useMemo(
    () => new Client(`ws://localhost:${process.env.PORT || 3000}`),
    []
  );
};
