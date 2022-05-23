import { defaultBoard } from '../../lib/defaultBoard';

type NewGamePlayer = Pick<Player, 'name' | 'email'>;

export const getNewGame = (
  gameId: string,
  player1: NewGamePlayer,
  player2: NewGamePlayer
): { games: { [k: string]: Game } } => ({
  games: {
    [gameId]: {
      turn: 0,
      movements: 0,
      players: [
        {
          name: player1.name,
          email: player1.email,
          gameStats: { wins: 0, losses: 0, capturedDiscs: 0, capturedKings: 0 }
        },
        {
          name: player2.name,
          email: player2.email,
          gameStats: { wins: 0, losses: 0, capturedDiscs: 0, capturedKings: 0 }
        }
      ],
      board: defaultBoard
    }
  }
});
