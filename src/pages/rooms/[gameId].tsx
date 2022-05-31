import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Loading,
  PlayerForm,
  Game,
  DefaultGameHeaderLayout,
  Paused
} from '../../components';
import { useRoom, useProfile } from '../../hooks';

const Play = () => {
  const { profile } = useProfile();
  const router = useRouter();
  const { onReconnectRoom, onJoinRoom, players, sessionId } = useRoom();
  const gameId = router.query.gameId as string;
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    // already joined, not "auth", screen didn't load yet
    if (isJoining || sessionId || !profile || !gameId) return;

    const join = async () => {
      let hasJoined;
      setIsJoining(true);
      hasJoined = await onReconnectRoom({
        sessionId: profile.sessionId,
        gameId
      });
      if (!hasJoined) {
        hasJoined = await onJoinRoom({ player: profile, gameId });
      }
      setIsJoining(false);
      if (!hasJoined) return router.push('/');
    };

    join();
  }, [
    isJoining,
    setIsJoining,
    onReconnectRoom,
    sessionId,
    router,
    onJoinRoom,
    gameId,
    profile
  ]);

  const isPaused = players.length !== 2 || players.some(p => !p.isConnected);

  let content;
  if (isJoining) {
    content = <Loading />;
  } else if (sessionId) {
    content = (
      <>
        {isPaused && <Paused />}
        <Game />
      </>
    );
  } else if (!profile) {
    content = <PlayerForm title="Join This Game" />;
  } else {
    content = <Loading />;
  }

  return <DefaultGameHeaderLayout>{content}</DefaultGameHeaderLayout>;
};

export default Play;
