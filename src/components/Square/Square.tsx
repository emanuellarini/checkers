import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Box } from '@mui/material';

import { Disc } from '../Disc';

export type SquareProps = {
  x: number;
  y: number;
};

const squareStyle = {
  overflow: 'hidden',
  position: 'relative',
  aspectRatio: '1',
  backgroundColor: '#bcaa99',
  '&:nth-of-type(-2n+8)': {
    backgroundColor: '#88665d'
  },
  '&:nth-of-type(8) ~ *:nth-of-type(-2n+15)': {
    backgroundColor: '#88665d'
  },
  '&:nth-of-type(16) ~ *:nth-of-type(-2n+24)': {
    backgroundColor: '#88665d'
  },
  '&:nth-of-type(24) ~ *:nth-of-type(-2n+31)': {
    backgroundColor: '#88665d'
  },
  '&:nth-of-type(32) ~ *:nth-of-type(-2n+40)': {
    backgroundColor: '#88665d'
  },
  '&:nth-of-type(40) ~ *:nth-of-type(-2n+47)': {
    backgroundColor: '#88665d'
  },
  '&:nth-of-type(48) ~ *:nth-of-type(-2n+56)': {
    backgroundColor: '#88665d'
  },
  '&:nth-of-type(56) ~ *:nth-of-type(-2n+63)': {
    backgroundColor: '#88665d'
  }
};

export const Square: React.FC<SquareProps> = memo(({ x, y }) => {
  if ((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0)) {
    return <Box sx={squareStyle} />;
  }

  return (
    <Droppable
      ignoreContainerClipping
      droppableId={`square-${x}-${y}`}
      isDropDisabled={
        (x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0)
      }
    >
      {provided => (
        <Box aria-label="Square" sx={squareStyle}>
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              margin: '15%'
            }}
          >
            {x % 2 !== 0 && (
              <Disc
                player={2}
                isKing={x % 4 === 0}
                index={Number(`${x}${y}`)}
              />
            )}
          </Box>
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
});
