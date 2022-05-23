export const getGameId = (player1Email: string, player2Email: string) =>
  `${player1Email}-${player2Email}`;

export const createGameId = () =>
  window.crypto.getRandomValues(new Uint32Array(1))[0].toString(10);
