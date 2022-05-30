import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useReducer
} from 'react';

import { Alert, Snackbar } from '@mui/material';
import { Room } from 'colyseus.js';

import { useClient } from '../../hooks';
import { defaultSquares } from '../../lib/defaultSquares';
import {
  calculatePlayerMovablePositions,
  calculatePlayerMovablePositionsWhenMultiCapturing
} from '../../lib/movement';
import { GameSchema } from '../../lib/schemas';
import {
  discsReducer,
  discsInitialState,
  DiscsStateType
} from './discsReducer';
import {
  gameStatsReducer,
  gameStatsInitialState,
  GameStatsStateType
} from './gameStatsReducer';
import {
  playersReducer,
  playersInitialState,
  PlayersStateType
} from './playersReducer';

type CreateRoom = { player: Pick<Player, 'name' | 'email'> };

type JoinRoom = CreateRoom & {
  gameId: GameId;
};

type RoomContextType = GameStatsStateType & {
  onCreateRoom: (data: CreateRoom) => Promise<string> | string;
  onJoinRoom: (data: JoinRoom) => Promise<void> | void;
  onStartMovement: (position: Position) => void;
  onEndMovement: (currentPosition: Position, newPosition: Position) => void;
  onResetGame: () => void;
  onEndTurn: () => void;
  squares: Game['squares'];
  movablePositions: Position[];
  discs: DiscsStateType;
  players: PlayersStateType;
  gameId: GameId | null;
  sessionId: Player['sessionId'];
};

const initialContext: RoomContextType = {
  onCreateRoom: () => '',
  onJoinRoom: () => undefined,
  onStartMovement: () => undefined,
  onEndMovement: () => undefined,
  onResetGame: () => undefined,
  onEndTurn: () => undefined,
  movablePositions: [],
  gameId: null,
  sessionId: '',
  squares: defaultSquares,
  discs: discsInitialState,
  players: playersInitialState,
  ...gameStatsInitialState
};

export const RoomContext = createContext(initialContext);

type RoomProviderProps = {
  children: React.ReactNode;
};

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const client = useClient();
  const [movablePositions, setMovablePositions] = useState<
    RoomContextType['movablePositions']
  >(initialContext.movablePositions);
  const [gameId, setGameId] = useState<RoomContextType['gameId']>(
    initialContext.gameId
  );
  const [discs, discsDispatch] = useReducer(discsReducer, initialContext.discs);
  const [gameStats, gameStatsDispatch] = useReducer(gameStatsReducer, {
    turn: initialContext.turn,
    movements: initialContext.movements,
    winner: initialContext.winner
  });
  const [players, playersDispatch] = useReducer(
    playersReducer,
    initialContext.players
  );

  const [error, setError] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room<GameSchema>>();

  useEffect(() => {
    if (!currentRoom) return;

    currentRoom.onMessage('PLAYER_JOINED_ROOM', data => {
      playersDispatch({
        type: 'INITIALIZE',
        payload: data.players
      });

      discsDispatch({
        type: 'INITIALIZE',
        payload: data.discs
      });

      gameStatsDispatch({
        type: 'INITIALIZE',
        payload: {
          turn: data.turn,
          movements: data.movements,
          winner: data.winner
        }
      });
    });

    currentRoom.onMessage('PLAYER_LEFT_ROOM', payload => {
      playersDispatch({
        type: 'REMOVE_PLAYER',
        payload
      });
    });

    currentRoom.onMessage('END_MOVEMENT', data => {
      if (data.capturedPosition) {
        discsDispatch({
          type: 'REMOVE_DISC',
          payload: data.capturedPosition
        });
      }

      gameStatsDispatch({
        type: 'SET_WINNER',
        payload: data.winner
      });

      discsDispatch({
        type: 'UPDATE_DISC',
        payload: data.updateDisc
      });

      playersDispatch({
        type: 'UPDATE_PLAYER',
        payload: {
          key: gameStats.turn,
          player: data.currentPlayer
        }
      });

      playersDispatch({
        type: 'UPDATE_PLAYER',
        payload: {
          key: gameStats.turn,
          player: data.otherPlayer
        }
      });

      gameStatsDispatch({
        type: 'SET_MOVEMENTS',
        payload: data.movements
      });
    });

    return () => {
      currentRoom.removeAllListeners();
    };
  }, [gameStats.turn, currentRoom]);

  const onJoinRoom = useCallback<RoomContextType['onJoinRoom']>(
    async data => {
      try {
        const joinedRoom = await client.joinById<GameSchema>(data.gameId, data);
        setGameId(joinedRoom.id);
        setCurrentRoom(joinedRoom);
      } catch (e) {
        setGameId(null);
        console.error('ERROR!', e);
        setError(true);
      }
    },
    [setError, client]
  );

  const onCreateRoom = useCallback<RoomContextType['onCreateRoom']>(
    async data => {
      try {
        // this already executes onJoin in server room
        const createdRoom = await client.create<GameSchema>('game', data);
        setGameId(createdRoom.id);
        setCurrentRoom(createdRoom);
        return createdRoom.id;
      } catch (e) {
        console.error('ERROR!', e);
        setError(true);
        return '';
      }
    },
    [setError, client]
  );

  const onStartMovement = useCallback<RoomContextType['onStartMovement']>(
    position => {
      setMovablePositions([]);

      let movablePositions;

      if (gameStats.movements === 0) {
        movablePositions = calculatePlayerMovablePositions(
          gameStats.turn,
          discs,
          position
        );
      } else {
        movablePositions = calculatePlayerMovablePositionsWhenMultiCapturing(
          gameStats.turn,
          discs,
          position
        );
      }

      setMovablePositions(movablePositions);
    },
    [setMovablePositions, discs, gameStats]
  );

  const onEndMovement = useCallback<RoomContextType['onEndMovement']>(
    (currentPosition, newPosition) => {
      currentRoom?.send('MOVE_DISC', { currentPosition, newPosition });
    },
    [currentRoom]
  );

  const onEndTurn = useCallback<RoomContextType['onEndTurn']>(() => null, []);

  const onResetGame = useCallback<RoomContextType['onResetGame']>(
    () => null,
    []
  );

  return (
    <RoomContext.Provider
      value={{
        ...gameStats,
        discs,
        players,
        squares: initialContext.squares,
        movablePositions,
        gameId,
        sessionId: currentRoom?.sessionId || '',
        onCreateRoom,
        onJoinRoom,
        onStartMovement,
        onEndMovement,
        onResetGame,
        onEndTurn
      }}
    >
      <Snackbar open={!!error} autoHideDuration={3000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Unable to setup the game. Try again later.
        </Alert>
      </Snackbar>

      {children}
    </RoomContext.Provider>
  );
};
