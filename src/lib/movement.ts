const canDropIntoSquare = (board: Board, position: number) =>
  position >= 0 && position <= 63 && board[position].isDarkSquare;

const getPositions = (board: Board, player: PlayerKey, position: Position) => {
  const upperLeft = player === 0 ? +position - 7 : +position + 7;
  const upperRight = player === 0 ? +position - 9 : +position + 9;
  const twoUpperLeft = player === 0 ? +position - 14 : +position + 14;
  const twoUpperRight = player === 0 ? +position - 18 : +position + 18;
  const lowerLeft = player === 0 ? +position + 7 : +position - 7;
  const lowerRight = player === 0 ? +position + 9 : +position - 9;
  const twoLowerLeft = player === 0 ? +position + 14 : +position - 14;
  const twoLowerRight = player === 0 ? +position + 18 : +position - 18;

  return {
    upperLeft: canDropIntoSquare(board, upperLeft) ? upperLeft : -1,
    upperRight: canDropIntoSquare(board, upperRight) ? upperRight : -1,
    twoUpperLeft: canDropIntoSquare(board, twoUpperLeft) ? twoUpperLeft : -1,
    twoUpperRight: canDropIntoSquare(board, twoUpperRight) ? twoUpperRight : -1,
    lowerLeft: canDropIntoSquare(board, lowerLeft) ? lowerLeft : -1,
    lowerRight: canDropIntoSquare(board, lowerRight) ? lowerRight : -1,
    twoLowerLeft: canDropIntoSquare(board, twoLowerLeft) ? twoLowerLeft : -1,
    twoLowerRight: canDropIntoSquare(board, twoLowerRight) ? twoLowerRight : -1
  };
};

const getDirectionPossibleMoves = (
  position: Position,
  doublePosition: Position,
  board: Board,
  player: number
) => {
  const possibleMoves = [];
  const square = board[position];
  const squareDouble = board[doublePosition];

  // does not contain a disc in the destination
  if (square && !square.disc) {
    possibleMoves.push(position);
    // does not contain a disc in the destination
    // and has a disc in the intermediary diagonal square which belongs to another player
  } else if (
    squareDouble &&
    !squareDouble.disc &&
    square.disc?.player !== player
  ) {
    possibleMoves.push(doublePosition);
  }

  return possibleMoves;
};

export const calculatePlayerMovablePositions = (
  player: PlayerKey,
  board: Board,
  position: Position
): Position[] => {
  const {
    upperLeft,
    upperRight,
    twoUpperLeft,
    twoUpperRight,
    lowerLeft,
    lowerRight,
    twoLowerLeft,
    twoLowerRight
  } = getPositions(board, player, position);

  const { disc } = board[position];

  const upperLeftPossibleMoves = getDirectionPossibleMoves(
    upperLeft,
    twoUpperLeft,
    board,
    player
  );

  const upperRightPossibleMoves = getDirectionPossibleMoves(
    upperRight,
    twoUpperRight,
    board,
    player
  );

  let lowerLeftPossibleMoves: Position[] = [];
  let lowerRightPossibleMoves: Position[] = [];
  if (disc?.isKing) {
    lowerLeftPossibleMoves = getDirectionPossibleMoves(
      lowerLeft,
      twoLowerLeft,
      board,
      player
    );

    lowerRightPossibleMoves = getDirectionPossibleMoves(
      lowerRight,
      twoLowerRight,
      board,
      player
    );
  }

  return [
    ...upperLeftPossibleMoves,
    ...upperRightPossibleMoves,
    ...lowerLeftPossibleMoves,
    ...lowerRightPossibleMoves
  ];
};

export const getCapturedDiscPosition = (
  board: Board,
  currentPosition: Position,
  newPosition: Position
): Position | undefined => {
  const distance = newPosition - currentPosition;

  const middlePosition = (newPosition + currentPosition) / 2;

  // these numbers mean the disc has jump over
  // no need to check if the disc belongs to te opposite player here
  // because we already did that in possible moves fn
  if (![-18, -14, 14, 18].includes(distance) || !board[middlePosition]?.disc)
    return undefined;

  return middlePosition;
};

export const calculatePlayerMovablePositionsWhenMultiCapturing = (
  player: PlayerKey,
  board: Board,
  position: Position
): Position[] => {
  const possibleMoves: Position[] = [];
  const { disc } = board[position];

  const {
    upperLeft,
    upperRight,
    twoUpperLeft,
    twoUpperRight,
    lowerLeft,
    lowerRight,
    twoLowerLeft,
    twoLowerRight
  } = getPositions(board, player, position);

  const boardUpperLeft = board[upperLeft];
  const boardUpperRight = board[upperRight];
  const boardTwoUpperLeft = board[twoUpperLeft];
  const boardTwoUpperRight = board[twoUpperRight];

  const boardLowerLeft = board[lowerLeft];
  const boardLowerRight = board[lowerRight];
  const boardTwoLowerLeft = board[twoLowerLeft];
  const boardTwoLowerRight = board[twoLowerRight];

  if (
    boardUpperLeft?.disc &&
    boardUpperLeft.disc.player !== player &&
    !boardTwoUpperLeft?.disc
  ) {
    possibleMoves.push(twoUpperLeft);
  }

  if (
    boardUpperRight?.disc &&
    boardUpperRight.disc?.player !== player &&
    !boardTwoUpperRight?.disc
  ) {
    possibleMoves.push(twoUpperRight);
  }

  if (
    disc?.isKing &&
    boardLowerLeft?.disc &&
    boardLowerLeft.disc?.player !== player &&
    !boardTwoLowerLeft?.disc
  ) {
    possibleMoves.push(twoLowerLeft);
  }

  if (
    disc?.isKing &&
    boardLowerRight.disc &&
    boardLowerRight?.disc?.player !== player &&
    !boardTwoLowerRight?.disc
  ) {
    possibleMoves.push(twoLowerRight);
  }

  return possibleMoves;
};
