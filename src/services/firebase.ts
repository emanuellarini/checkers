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
  deleteDoc,
  documentId
} from 'firebase/firestore';

import { defaultDiscs } from '../lib/defaultDiscs';
import { getDefaultPlayer } from '../lib/defaultPlayer';
import { defaultSquares } from '../lib/defaultSquares';

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

export const getDiscsRef = (gameId?: string) =>
  query(collection(db, `games/${gameId}/discs`), orderBy(documentId(), 'asc'));

export const getPlayersRef = (gameId?: string) =>
  collection(db, `games/${gameId}/players`);

export const moveDisc = async (
  gameId: string,
  currentPosition: Position,
  newPosition: Position,
  isKing: boolean
) => {
  const discQuery = query(
    collection(db, `games/${gameId}/discs`),
    where('position', '==', currentPosition)
  );
  const discSnaps = await getDocs(discQuery);
  const disc = discSnaps.docs[0];

  const updatedDisc = {
    ...disc.data(),
    isKing,
    position: newPosition
  };
  const discRef = doc(db, `games/${gameId}/discs/${disc.id}`);

  await updateDoc(discRef, updatedDisc);
};

export const removeDisc = async (gameId: string, position: Position) => {
  const discQuery = query(
    collection(db, `games/${gameId}/discs`),
    where('position', '==', position)
  );
  const discSnap = await getDocs(discQuery);
  const discId = discSnap.docs[0].id;
  const discRef = doc(db, `games/${gameId}/discs/${discId}`);
  return deleteDoc(discRef);
};

export const setMovements = (gameId: string, count: number) =>
  updateDoc(doc(db, `games/${gameId}`), { movements: count });

export const setTurn = (gameId: string, turn: number) =>
  updateDoc(doc(db, `games/${gameId}`), { turn });

export const resetGame = (gameId: string) =>
  updateDoc(doc(db, `games/${gameId}`), {
    discs: defaultSquares,
    turn: 0,
    movements: 0
  });

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

    defaultDiscs.map(disc =>
      addDoc(collection(db, 'games', gameId, 'discs'), disc)
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
