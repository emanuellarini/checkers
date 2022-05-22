type Position = string;

type Player = {
  name: string;
  email: string;
  gameStats: {
    wins: number;
    losses: number;
    capturedDiscs: number;
    capturedKings: number;
  };
};

type Disc = { player: PlayerKey; isKing: boolean };

type Square = {
  isDarkSquare: boolean;
  isDroppable?: boolean;
  disc?: Disc;
};

type Board = { [k: Position]: Square };

type Players = Player[];

type PlayerKey = 0 | 1;

type Turn = PlayerKey;
