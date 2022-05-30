export const hasWonThisTurn = (
  players: Game['players'],
  turn: PlayerKey,
  discs: Disc[]
) => {
  const currentPlayerCaptured =
    players[turn].capturedDiscs + players[turn].capturedKings;
  const currentPlayer = {
    captured: currentPlayerCaptured,
    discs: 12 - currentPlayerCaptured
  };

  const otherPlayerKey = turn === 0 ? 1 : 0;
  const otherPlayerCaptured =
    players[otherPlayerKey].capturedDiscs +
    players[otherPlayerKey].capturedKings;

  const otherPlayer = {
    captured: otherPlayerCaptured,
    discs: 12 - otherPlayerCaptured
  };

  const hasKingDisc = discs.some(disc => disc.player === turn && disc.isKing);

  return (
    // captured 11 plus another this turn
    currentPlayer.captured === 11 ||
    // has a king versus a common disc
    (currentPlayer.discs === 1 && otherPlayer.discs === 1 && hasKingDisc)
  );
};
