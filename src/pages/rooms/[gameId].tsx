import React, { useEffect, useState, useMemo } from 'react';

import { useRouter } from 'next/router';

import {
  Loading,
  PlayerForm,
  Game,
  DefaultGameHeaderLayout
} from '../../components';
import { useRoom, useProfile } from '../../hooks';

const Play = () => {
  const { profile } = useProfile();
  const router = useRouter();
  const { onJoinRoom, players, sessionId } = useRoom();
  const gameId = router.query.gameId as string;
  const isPlaying = useMemo(
    () => players.some(p => p.sessionId === sessionId),
    [players, sessionId]
  );
  const [isJoining, setIsJoining] = useState(!(isPlaying && gameId));

  useEffect(() => {
    if (!gameId) return;
    if (!profile?.name || isPlaying) {
      setIsJoining(false);
      return;
    }

    const join = async () => {
      setIsJoining(true);
      await onJoinRoom({ player: profile, gameId });
      setIsJoining(false);
    };

    join();
  }, [isPlaying, setIsJoining, onJoinRoom, profile, gameId]);

  let content;
  if (!gameId || isJoining) {
    content = <Loading />;
  } else if (!profile?.name) {
    content = <PlayerForm title="Join This Game" />;
  } else {
    content = <Game />;
  }

  return <DefaultGameHeaderLayout>{content}</DefaultGameHeaderLayout>;
};

export default Play;
