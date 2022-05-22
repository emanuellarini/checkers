export const hasWonThisTurn = (
  players: Players,
  turn: PlayerKey,
  board: Board
) => {
  const currentPlayerCaptured =
    players[turn].gameStats.capturedDiscs +
    players[turn].gameStats.capturedKings;
  const currentPlayer = {
    captured: currentPlayerCaptured,
    discs: 12 - currentPlayerCaptured
  };

  const otherPlayerKey = turn === 0 ? 1 : 0;
  const otherPlayerCaptured =
    players[otherPlayerKey].gameStats.capturedDiscs +
    players[otherPlayerKey].gameStats.capturedKings;

  const otherPlayer = {
    captured: otherPlayerCaptured,
    discs: 12 - otherPlayerCaptured
  };

  const hasKingDisc = Object.values(board).some(
    square => square.disc && square.disc.player === turn && square.disc.isKing
  );

  return (
    // captured 11 plus another this turn
    currentPlayer.captured === 11 ||
    // has a king versus a common disc
    (currentPlayer.discs === 1 && otherPlayer.discs === 1 && hasKingDisc)
  );
};
