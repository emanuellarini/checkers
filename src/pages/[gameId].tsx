import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Loading,
  PlayerForm,
  Game,
  DefaultGameHeaderLayout
} from '../components';
import { useRoom, useProfile } from '../hooks';

const Play = () => {
  const { profile } = useProfile();
  const router = useRouter();
  const { onReconnectRoom, onJoinRoom, sessionId } = useRoom();
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
      if (!hasJoined) return router.push('/');
      setIsJoining(false);
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

  let content;
  if (isJoining) {
    content = <Loading />;
  } else if (sessionId) {
    content = <Game />;
  } else if (!profile) {
    content = <PlayerForm />;
  } else {
    content = <Loading />;
  }

  return <DefaultGameHeaderLayout>{content}</DefaultGameHeaderLayout>;
};

export default Play;
