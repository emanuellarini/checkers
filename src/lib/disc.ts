export const getDiscKey = (player: number, index: number) =>
  `player-${player}/disc-${index}`;

export const getPlayerId = (discKey: string) =>
  Number(discKey.split('/')[0].replace('player-', ''));
