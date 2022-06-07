import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useReducer
} from 'react';

import {
  calculatePlayerMovablePositions,
  calculatePlayerMovablePositionsWhenMultiCapturing,
  defaultSquares,
  getIsKingDisc
} from '@checkers/game-common';
import { Player, GameId, Position, Game } from '@checkers/game-interfaces';

import { Room } from 'colyseus.js';

import { useClient, useProfile } from '../../hooks';
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
import { RoomError } from './RoomError';

type CreateRoom = { player: Pick<Player, 'name' | 'email'> };

type JoinRoom = CreateRoom & {
  gameId: GameId;
};

type ReconnectRoom = {
  gameId: GameId;
  sessionId: Player['sessionId'];
};

type RoomContextType = GameStatsStateType & {
  onCreateRoom: (data: CreateRoom) => Promise<string> | string;
  onJoinRoom: (data: JoinRoom) => Promise<boolean> | boolean;
  onReconnectRoom: (data: ReconnectRoom) => Promise<boolean> | boolean;
  onStartMovement: (position: Position) => void;
  onEndMovement: (currentPosition: Position, newPosition: Position) => void;
  onConfirmRematch: () => void;
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
  onJoinRoom: () => false,
  onReconnectRoom: () => false,
  onStartMovement: () => undefined,
  onEndMovement: () => undefined,
  onConfirmRematch: () => undefined,
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
  const { setProfile } = useProfile();
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

  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (!currentRoom) return;

    currentRoom.onMessage('END_TURN', data => {
      gameStatsDispatch({
        type: 'SET_TURN',
        payload: data.turn
      });
      gameStatsDispatch({
        type: 'SET_MOVEMENTS',
        payload: data.movements
      });
    });

    currentRoom.onMessage('REMATCH', data => {
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
        payload: data
      });
    });

    currentRoom.onMessage('END_TURN', data => {
      gameStatsDispatch({
        type: 'SET_TURN',
        payload: data.turn
      });
      gameStatsDispatch({
        type: 'SET_MOVEMENTS',
        payload: data.movements
      });
    });

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
        payload: data
      });
    });

    currentRoom.onMessage('PLAYER_LEFT_ROOM', payload => {
      playersDispatch({
        type: 'REMOVE_PLAYER',
        payload
      });
    });

    currentRoom.onMessage('PLAYER_DISCONNECTED_ROOM', index => {
      playersDispatch({
        type: 'UPDATE_PLAYER',
        payload: {
          key: index,
          player: {
            isConnected: false
          }
        }
      });
    });

    currentRoom.onMessage('PLAYER_RECONNECTED_ROOM', index => {
      playersDispatch({
        type: 'UPDATE_PLAYER',
        payload: {
          key: index,
          player: {
            isConnected: true
          }
        }
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
        payload: data.updatedDisc
      });

      playersDispatch({
        type: 'UPDATE_PLAYER',
        payload: {
          key: data.currentPlayer.key,
          player: data.currentPlayer.data
        }
      });

      playersDispatch({
        type: 'UPDATE_PLAYER',
        payload: {
          key: data.otherPlayer.key,
          player: data.otherPlayer.data
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
  }, [currentRoom]);

  const onCreateRoom = useCallback<RoomContextType['onCreateRoom']>(
    async data => {
      try {
        // this already executes onJoin in server room
        const createdRoom = await client.create('game', data);

        setProfile({
          name: data.player.name,
          email: data.player.email,
          sessionId: createdRoom.sessionId
        });
        setGameId(createdRoom.id);
        setCurrentRoom(createdRoom);
        return createdRoom.id;
      } catch (e) {
        setCurrentRoom(null);
        setGameId(null);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setErrorCode(e?.code || 0);
        return '';
      }
    },
    [setErrorCode, client, setProfile]
  );
  const onJoinRoom = useCallback<RoomContextType['onJoinRoom']>(
    async data => {
      try {
        const joinedRoom = await client.joinById(data.gameId, data);
        setProfile({
          name: data.player.name,
          email: data.player.email,
          sessionId: joinedRoom.sessionId
        });
        console.log('joined', joinedRoom);
        setGameId(joinedRoom.id);
        setCurrentRoom(joinedRoom);
        return true;
      } catch (e) {
        console.log(e);
        setCurrentRoom(null);
        setGameId(null);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setErrorCode(e?.code || 0);
        return false;
      }
    },
    [setErrorCode, client, setProfile]
  );

  const onReconnectRoom = useCallback<RoomContextType['onReconnectRoom']>(
    async data => {
      if (!data.sessionId || !data.gameId) {
        setCurrentRoom(null);
        setGameId(null);
        return false;
      }

      try {
        const reconnectedRoom = await client.reconnect(
          data.gameId,
          data.sessionId
        );
        setGameId(reconnectedRoom.id);
        setCurrentRoom(reconnectedRoom);
        return true;
      } catch (e) {
        setCurrentRoom(null);
        setGameId(null);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setErrorCode(e?.code || 0);
        return false;
      }
    },
    [setErrorCode, client]
  );

  const onStartMovement = useCallback<RoomContextType['onStartMovement']>(
    position => {
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
      currentRoom?.send('END_MOVEMENT', { currentPosition, newPosition });

      const key = discs.findIndex(disc => disc.position === currentPosition);

      const isKing = getIsKingDisc(newPosition, discs[key]);

      const updatedDisc = {
        ...discs[key],
        isKing,
        position: newPosition
      };

      discsDispatch({
        type: 'UPDATE_DISC',
        payload: updatedDisc
      });

      setMovablePositions([]);
    },
    [currentRoom, discs, setMovablePositions]
  );

  const onEndTurn = useCallback<RoomContextType['onEndTurn']>(() => {
    currentRoom?.send('END_TURN');
  }, [currentRoom]);

  const onConfirmRematch = useCallback<
    RoomContextType['onConfirmRematch']
  >(() => {
    currentRoom?.send('CONFIRM_REMATCH');
  }, [currentRoom]);

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
        onConfirmRematch,
        onEndTurn,
        onReconnectRoom
      }}
    >
      <RoomError code={errorCode} onClose={() => setErrorCode(null)} />
      {children}
    </RoomContext.Provider>
  );
};
