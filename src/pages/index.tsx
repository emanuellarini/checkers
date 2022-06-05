import React from 'react';

import { Tutorial, DefaultHeaderLayout, PlayerForm } from '../components';
import { useStorage } from '../hooks';

const Index = () => {
  const [tutorialDone, setTutorialDone] = useStorage<boolean>(
    'localStorage',
    'checkersTutorial',
    false
  );

  return (
    <DefaultHeaderLayout>
      {tutorialDone ? (
        <PlayerForm />
      ) : (
        <Tutorial setTutorialDone={setTutorialDone} />
      )}
    </DefaultHeaderLayout>
  );
};

export default Index;
