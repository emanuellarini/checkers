import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Box } from '@mui/material';

import { useGame } from '../../hooks';

export type SquareProps = {
  position: number;
  children: React.ReactNode;
};

const getSquareStyle = (isDroppable = false) => ({
  overflow: 'hidden',
  position: 'relative',
  aspectRatio: '1',
  backgroundColor: isDroppable ? '#88665d' : '#bcaa99',
  width: '100%',
  height: '100%',
  // paddings and margins should be applied here instead of parent
  padding: '5%'
});

export const Square: React.FC<SquareProps> = memo(({ position, children }) => {
  const { squares } = useGame();

  if (!Object.keys(squares).includes(String(position))) {
    return <Box sx={getSquareStyle()} />;
  }

  const id = `square-${position}`;

  return (
    <Droppable droppableId={id} isDropDisabled={!squares[position]}>
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={getSquareStyle(true)}
        >
          {children}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
});
