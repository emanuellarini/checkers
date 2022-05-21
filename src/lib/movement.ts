const getPositions = (player: number, position: Position) => ({
  upperLeft: String(player === 1 ? +position - 7 : +position + 7),
  upperRight: String(player === 1 ? +position - 9 : +position + 9),
  twoUpperLeft: String(player === 1 ? +position - 14 : +position + 14),
  twoUpperRight: String(player === 1 ? +position - 18 : +position + 18)
});

export const calculatePlayerMovablePositions = (
  player: number,
  board: Board,
  position: Position
) => {
  const possibleMoves: string[] = [];

  // player 1 goes up and player 2 goes down when moving!
  const { upperLeft, upperRight, twoUpperLeft, twoUpperRight } = getPositions(
    player,
    position
  );

  const boardUpperLeft = board[upperLeft];
  const boardUpperRight = board[upperRight];
  const boardTwoUpperLeft = board[twoUpperLeft];
  const boardTwoUpperRight = board[twoUpperRight];

  // does not contain a disc in the destination
  if (!boardUpperLeft?.disc) {
    possibleMoves.push(upperLeft);
    // does not contain a disc in the destination
    // and has a disc in the intermediary diagonal square which belongs to another player
  } else if (
    !boardTwoUpperLeft?.disc &&
    boardUpperLeft?.disc?.player !== player
  ) {
    possibleMoves.push(twoUpperLeft);
  }

  if (!boardUpperRight?.disc) {
    possibleMoves.push(upperRight);
  } else if (
    !boardTwoUpperRight?.disc &&
    boardUpperRight?.disc?.player !== player
  ) {
    possibleMoves.push(twoUpperRight);
  }

  return possibleMoves;
};

export const getCapturedDiscPosition = (
  board: Board,
  currentPosition: Position,
  newPosition: Position
): string | undefined => {
  const distance = String(+newPosition - +currentPosition);

  const middlePosition = String((+newPosition + +currentPosition) / 2);

  // these numbers mean the disc has jump over
  // no need to check if the disc belongs to te opposite player here
  // because we already did that in possible moves fn
  if (
    !['-18', '-14', '14', '18'].includes(distance) ||
    !board[middlePosition]?.disc
  )
    return undefined;

  return middlePosition;
};

export const calculatePlayerMovablePositionsWhenMultiCapturing = (
  player: number,
  board: Board,
  position: Position
) => {
  const possibleMoves: string[] = [];
  const { upperLeft, upperRight, twoUpperLeft, twoUpperRight } = getPositions(
    player,
    position
  );
  const boardUpperLeft = board[upperLeft];
  const boardUpperRight = board[upperRight];
  const boardTwoUpperLeft = board[twoUpperLeft];
  const boardTwoUpperRight = board[twoUpperRight];

  if (boardUpperLeft?.disc?.player !== player && !boardTwoUpperLeft?.disc) {
    possibleMoves.push(twoUpperLeft);
  }

  if (boardUpperRight?.disc?.player !== player && !boardTwoUpperRight?.disc) {
    possibleMoves.push(twoUpperRight);
  }

  return possibleMoves;
};
