import { useMemo } from 'react';

import { Client } from 'colyseus.js';

const url = process.env.NODE_ENV === 'production' ? '/' : 'ws://localhost:3333';

export const useClient = () => {
  return useMemo(() => new Client(url), []);
};
