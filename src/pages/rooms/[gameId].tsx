import React, { useEffect } from 'react';

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

  useEffect(() => {
    // already joined, not "auth", screen didn't load yet
    if (sessionId || !profile || !gameId) return;

    const join = async () => {
      let hasJoined;
      if (profile.sessionId) {
        hasJoined = await onReconnectRoom({
          sessionId: profile.sessionId,
          gameId
        });
      } else {
        hasJoined = await onJoinRoom({ player: profile, gameId });
      }
      if (!hasJoined) return router.push('/');
    };

    join();
  }, [onReconnectRoom, sessionId, router, onJoinRoom, gameId, profile]);

  const isPaused = players.length !== 2 || players.some(p => !p.isConnected);

  let content;
  if (sessionId) {
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
