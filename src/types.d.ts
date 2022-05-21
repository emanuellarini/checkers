type Position = string;

type Player = {
  wins: number;
  losses: number;
  captured: number;
  captures: number;
  turnMovements: number;
};

type Disc = { player: number; isKing: boolean };

type Square = {
  isDarkSquare: boolean;
  isDroppable?: boolean;
  disc?: Disc;
};

type Board = { [k: Position]: Square };
