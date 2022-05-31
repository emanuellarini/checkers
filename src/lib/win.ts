export const hasWonThisTurn = (
  players: Game['players'],
  turn: PlayerKey,
  discs: Disc[]
) => {
  const otherPlayerKey = turn === 0 ? 1 : 0;
  if (!players[otherPlayerKey] || !players[turn]) return false;

  const currentPlayerCaptured =
    players[turn].capturedDiscs + players[turn].capturedKings;
  const currentPlayer = {
    captured: currentPlayerCaptured,
    discs: 12 - currentPlayerCaptured
  };

  const otherPlayerCaptured =
    players[otherPlayerKey].capturedDiscs +
    players[otherPlayerKey].capturedKings;

  const otherPlayer = {
    captured: otherPlayerCaptured,
    discs: 12 - otherPlayerCaptured
  };

  const hasKingDisc = discs.some(disc => disc.player === turn && disc.isKing);

  return (
    currentPlayer.captured === 12 ||
    (currentPlayer.discs === 1 && otherPlayer.discs === 1 && hasKingDisc)
  );
};
