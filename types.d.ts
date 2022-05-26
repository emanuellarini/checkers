type Position = number;

type PlayerStats = {
  wins: number;
  losses: number;
  capturedDiscs: number;
  capturedKings: number;
};

type Player = {
  name: string;
  email: string;
  avatarUrl: string;
  gameStats: PlayerStats;
};

type DiscId = `disc-${number}${number}`;

type Disc = {
  id: DiscId;
  player: PlayerKey;
  isKing: boolean;
  position: Position;
};

type Square = {
  position: Position;
  isDarkSquare: boolean;
  isDroppable: boolean;
};

type Players = Player[];

type PlayerKey = 0 | 1;

type Turn = PlayerKey;

type Game = {
  winner: PlayerKey | null;
  turn: Turn;
  movements: number;
  players: Players;
  squares: Square[];
  discs: Disc[];
};
