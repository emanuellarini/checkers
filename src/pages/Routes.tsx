import React from 'react';

import { Router } from '@reach/router';

import { Main } from './Main';
import { Play } from './Play';

export const Routes = () => (
  <Router>
    <Main path="/" />
    <Play path="/:gameId" />
  </Router>
);
