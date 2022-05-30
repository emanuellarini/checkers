type Position = number;

type PlayerKey = number;

type Player = {
  name: string;
  email: string;
  id: PlayerKey;
  sessionId: string;
  wins: number;
  losses: number;
  capturedDiscs: number;
  capturedKings: number;
};

type Disc = {
  id: string;
  player: PlayerKey;
  isKing: boolean;
  position: Position;
};

type Square = {
  position: Position;
  isDarkSquare: boolean;
};

type Turn = PlayerKey;

type GameStats = {
  winner: PlayerKey;
  turn: Turn;
  movements: number;
};

type Game = GameStats & {
  players: Player[];
  squares: Square[];
  discs: Disc[];
};

type GameId = string;
