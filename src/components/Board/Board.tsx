import React from 'react';

import { Disc } from '../Disc';
import { Square } from '../Square';

export const Board = () => (
  <>
    {Array.from({ length: 64 }).map((_, i) => (
      <Square key={`square-${i}`}>
        <Disc player={2} isKing />
      </Square>
    ))}
  </>
);
