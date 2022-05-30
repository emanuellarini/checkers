import React from 'react';

import { PlayerForm, Game, DefaultGameHeaderLayout } from '../../components';
import { useRoom } from '../../hooks';

const Play = () => {
  const { players, sessionId } = useRoom();

  if (players.some(p => p.sessionId === sessionId)) {
    return (
      <DefaultGameHeaderLayout>
        <Game />
      </DefaultGameHeaderLayout>
    );
  }

  if (players.length >= 2) {
    return <>Game Room already has two players</>;
  }

  return (
    <DefaultGameHeaderLayout>
      <PlayerForm title="Join This Game" />
    </DefaultGameHeaderLayout>
  );
};

export default Play;
