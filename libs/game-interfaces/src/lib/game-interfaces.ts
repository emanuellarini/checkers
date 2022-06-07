export type Position = number;

export type PlayerKey = number;

export type Player = {
  isConnected: boolean;
  name: string;
  email: string;
  id: PlayerKey;
  sessionId: string;
  wins: number;
  losses: number;
  capturedDiscs: number;
  capturedKings: number;
};

export type Disc = {
  id: string;
  player: PlayerKey;
  isKing: boolean;
  position: Position;
};

export type Square = {
  position: Position;
  isDarkSquare: boolean;
};

export type Turn = PlayerKey;

export type GameStats = {
  winner: PlayerKey;
  turn: Turn;
  movements: number;
};

export type Game = GameStats & {
  players: Player[];
  squares: Square[];
  discs: Disc[];
};

export type GameId = string;
