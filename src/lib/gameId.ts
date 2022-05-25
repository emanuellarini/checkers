import crypto from 'crypto';

export const createGameId = () =>
  crypto.randomBytes(10).toString('hex').slice(0, 10);
