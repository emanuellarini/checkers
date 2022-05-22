const canDropIntoSquare = (board: Board, position: number) =>
  position >= 0 && position <= 63 && board[position].isDarkSquare;

const getPositions = (board: Board, player: number, position: Position) => {
  const upperLeft = player === 1 ? +position - 7 : +position + 7;
  const upperRight = player === 1 ? +position - 9 : +position + 9;
  const twoUpperLeft = player === 1 ? +position - 14 : +position + 14;
  const twoUpperRight = player === 1 ? +position - 18 : +position + 18;
  const lowerLeft = player === 1 ? +position + 7 : +position - 7;
  const lowerRight = player === 1 ? +position + 9 : +position - 9;
  const twoLowerLeft = player === 1 ? +position + 14 : +position - 14;
  const twoLowerRight = player === 1 ? +position + 18 : +position - 18;

  return {
    upperLeft: canDropIntoSquare(board, upperLeft) ? String(upperLeft) : '',
    upperRight: canDropIntoSquare(board, upperRight) ? String(upperRight) : '',
    twoUpperLeft: canDropIntoSquare(board, twoUpperLeft)
      ? String(twoUpperLeft)
      : '',
    twoUpperRight: canDropIntoSquare(board, twoUpperRight)
      ? String(twoUpperRight)
      : '',
    lowerLeft: canDropIntoSquare(board, lowerLeft) ? String(lowerLeft) : '',
    lowerRight: canDropIntoSquare(board, lowerRight) ? String(lowerRight) : '',
    twoLowerLeft: canDropIntoSquare(board, twoLowerLeft)
      ? String(twoLowerLeft)
      : '',
    twoLowerRight: canDropIntoSquare(board, twoLowerRight)
      ? String(twoLowerRight)
      : ''
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
  player: number,
  board: Board,
  position: Position
) => {
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

  let lowerLeftPossibleMoves: string[] = [];
  let lowerRightPossibleMoves: string[] = [];
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
