import { useContext } from 'react';

import { GameContext } from '../context';

export const useGame = () => {
  return useContext(GameContext);
};
