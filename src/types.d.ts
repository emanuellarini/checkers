type Position = string;

type Player = {
  name: string;
  email: string;
  gameStats: {
    wins: number;
    losses: number;
    discs: number;
    kings: number;
  };
};

type Disc = { player: keyof Players; isKing: boolean };

type Square = {
  isDarkSquare: boolean;
  isDroppable?: boolean;
  disc?: Disc;
};

type Board = { [k: Position]: Square };

type Players = { [k: number]: Player };

type Turn = keyof Players;
