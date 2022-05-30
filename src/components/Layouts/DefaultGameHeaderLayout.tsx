import React from 'react';

import { Container } from '@mui/material';

import { GameHeader } from './GameHeader';

type DefaultGameHeaderLayoutProps = {
  children: React.ReactNode;
};

export const DefaultGameHeaderLayout: React.FC<
  DefaultGameHeaderLayoutProps
> = ({ children }) => (
  <>
    <GameHeader />
    <Container component="main">{children}</Container>
  </>
);
