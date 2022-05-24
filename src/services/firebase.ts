import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  where,
  orderBy,
  query,
  addDoc,
  getDocs,
  getDoc,
  deleteField
} from 'firebase/firestore';

import { defaultBoard } from '../lib/defaultBoard';
import { getDefaultPlayer } from '../lib/defaultPlayer';

const firebaseConfig = {
  apiKey: 'AIzaSyDoleJdry9zhlZ56riNID2pxSf0BUVEkO4',
  authDomain: 'react-checkers-game.firebaseapp.com',
  projectId: 'react-checkers-game',
  storageBucket: 'react-checkers-game.appspot.com',
  messagingSenderId: '328272171903',
  appId: '1:328272171903:web:666777ecc44e26447e804a'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// odd = collection
// even = doc
export const getGameRef = (gameId?: string) => doc(db, `games/${gameId}`);

export const getBoardRef = (gameId?: string) =>
  query(collection(db, `games/${gameId}/board`), orderBy('position', 'asc'));

export const getPlayersRef = (gameId?: string) =>
  collection(db, `games/${gameId}/players`);

export const moveDisc = async (
  gameId: string,
  currentPosition: Position,
  newPosition: Position,
  isKing: boolean
) => {
  // const batch = writeBatch(db);

  const currentSquareQuery = query(
    collection(db, `games/${gameId}/board`),
    where('position', '==', currentPosition)
  );
  const currentSquareSnaps = await getDocs(currentSquareQuery);
  const currentSquare = currentSquareSnaps.docs[0].data();
  const newSquareQuery = query(
    collection(db, `games/${gameId}/board`),
    where('position', '==', newPosition)
  );
  const newSquareSnaps = await getDocs(newSquareQuery);
  const newSquare = newSquareSnaps.docs[0].data();
  const newSquareId = newSquareSnaps.docs[0].id;

  const newRef = doc(db, `games/${gameId}/board/${newSquareId}`);

  const newData = {
    ...newSquare,
    disc: {
      ...currentSquare.disc,
      isKing
    }
  };

  await updateDoc(newRef, newData);
  await removeDisc(gameId, currentPosition);
};

export const removeDisc = async (gameId: string, position: Position) => {
  const squareQuery = query(
    collection(db, `games/${gameId}/board`),
    where('position', '==', position)
  );
  const squareSnap = await getDocs(squareQuery);
  const squareId = squareSnap.docs[0].id;
  const squareRef = doc(db, `games/${gameId}/board/${squareId}`);
  return updateDoc(squareRef, { disc: deleteField() });
};

export const setMovements = (gameId: string, count: number) =>
  updateDoc(doc(db, `games/${gameId}`), { movements: count });

export const setTurn = (gameId: string, turn: number) =>
  updateDoc(doc(db, `games/${gameId}`), { turn });

export const resetBoard = (gameId: string) =>
  updateDoc(doc(db, `games/${gameId}`), { board: defaultBoard });

export const setPlayerStat = async <TItem extends keyof PlayerStats>(
  gameId: string,
  player: Turn,
  stat: Record<TItem, number>
) => {
  const playerRef = doc(db, `games/${gameId}/players/${player}`);
  const playerSnap = await getDoc(playerRef);
  const data = playerSnap.data();

  return updateDoc(doc(db, `games/${gameId}/players/${player}`), {
    ...data,
    gameStats: {
      ...data?.gameStats,
      ...stat
    }
  });
};

export const createNewGame = async ({
  gameId,
  player1,
  player2
}: {
  gameId: string;
  player1: Pick<Player, 'name' | 'email'>;
  player2: Pick<Player, 'name' | 'email'>;
}) => {
  try {
    await setDoc(doc(db, 'games/' + gameId), {
      turn: 0,
      movements: 0
    });

    defaultBoard.map(square =>
      addDoc(collection(db, 'games', gameId, 'board'), square)
    );

    await setDoc(
      doc(db, `games/${gameId}/players/0`),
      getDefaultPlayer(player1)
    );
    await setDoc(
      doc(db, `games/${gameId}/players/1`),
      getDefaultPlayer(player2)
    );

    return gameId;
  } catch (e) {
    return null;
  }
};

export const setPlayerInfo = (
  gameId: string,
  player: Turn,
  name: Player['name'],
  email: Player['email']
) =>
  updateDoc(doc(db, `games/${gameId}/players/${player}`), {
    name,
    email
  });
