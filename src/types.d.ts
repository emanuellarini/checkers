type Player = {
  wins: number;
  losses: number;
  captured: number;
  captures: number;
  turnMovements: number;
};

// number means position in board from 0 to 63
type Discs = { [k: string]: number };

// boolean means movable
type Squares = { [k: number]: boolean };
