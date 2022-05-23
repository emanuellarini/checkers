type Position = string;

type PlayerStats = {
  wins: number;
  losses: number;
  capturedDiscs: number;
  capturedKings: number;
};

type Player = {
  name: string;
  email: string;
  gameStats: PlayerStats;
};

type Disc = { player: PlayerKey; isKing: boolean };

type Square = {
  isDarkSquare: boolean;
  disc?: Disc;
};

type Board = { [k: Position]: Square };

type Players = Player[];

type PlayerKey = 0 | 1;

type Turn = PlayerKey;

type Game = {
  turn: Turn;
  movements: number;
  players: Players;
  board: Board;
};
