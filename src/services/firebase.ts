import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, onValue, remove } from 'firebase/database';

import { defaultBoard } from '../lib/defaultBoard';

const firebaseConfig = {
  apiKey: 'AIzaSyDoleJdry9zhlZ56riNID2pxSf0BUVEkO4',
  authDomain: 'react-checkers-game.firebaseapp.com',
  projectId: 'react-checkers-game',
  storageBucket: 'react-checkers-game.appspot.com',
  messagingSenderId: '328272171903',
  appId: '1:328272171903:web:666777ecc44e26447e804a'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const getGameRef = (gameId: string) => ref(db, `games/${gameId}`);

export const moveDisc = (
  gameId: string,
  currentPosition: Position,
  newPosition: Position,
  isKing: boolean
) => {
  const currentRef = ref(db, `games/${gameId}/board/${currentPosition}/disc`);
  const newRef = ref(db, `games/${gameId}/board/${newPosition}/disc`);
  onValue(currentRef, snap => {
    const disc = snap.val();
    remove(currentRef);
    update(newRef, { ...disc, isKing });
  });
};

export const removeDisc = (gameId: string, position: Position) => {
  remove(ref(db, `games/${gameId}/board/${position}/disc`));
};

export const setMovements = (gameId: string, count: number) => {
  update(ref(db, `games/${gameId}`), { movements: count });
};

export const setTurn = (gameId: string, turn: Turn) => {
  update(ref(db, `games/${gameId}`), { turn });
};

export const resetBoard = (gameId: string) => {
  update(ref(db, `games/${gameId}`), { board: defaultBoard });
};

export const setPlayerStat = <TItem extends keyof PlayerStats>(
  gameId: string,
  player: Turn,
  stat: Record<TItem, number>
) => {
  const playerRef = ref(db, `games/${gameId}/players/${player}/gameStats`);
  update(playerRef, stat);
};

export const createNewGame = (gameId: string) => {
  resetBoard(gameId);
};

export const setPlayerInfo = (
  gameId: string,
  player: Turn,
  name: Player['name'],
  email: Player['email']
) => {
  const playerRef = ref(db, `games/${gameId}/players/${player}`);
  update(playerRef, {
    name,
    email
  });
};
