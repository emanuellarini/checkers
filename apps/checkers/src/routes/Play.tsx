import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Loading, PlayerForm, Game, BasePage, Tutorial } from '../components';
import { useRoom, useProfile, useStorage } from '../hooks';

export const Play: React.FC = () => {
  const [tutorialDone, setTutorialDone] = useStorage<boolean>(
    'localStorage',
    'checkersTutorial',
    false
  );
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const { onReconnectRoom, onJoinRoom, sessionId } = useRoom();
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
      if (!hasJoined) return navigate('/');
      setIsJoining(false);
    };

    join();
  }, [
    isJoining,
    setIsJoining,
    onReconnectRoom,
    sessionId,
    navigate,
    onJoinRoom,
    gameId,
    profile
  ]);

  if (!tutorialDone) {
    return (
      <BasePage>
        <Tutorial setTutorialDone={setTutorialDone} />
      </BasePage>
    );
  }

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

  return <BasePage isGame>{content}</BasePage>;
};
