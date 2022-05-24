import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Box } from '@mui/material';

import { DraggableDisc } from '../Disc';
import { Debug } from './Debug';
import { Square } from './Square';

export type DroppableSquareProps = Square & {
  position: Position;
  isDroppable: boolean;
};

export const DroppableSquare: React.FC<DroppableSquareProps> = memo(
  ({ position, disc, isDroppable, isDarkSquare }) => (
    <Droppable
      droppableId={`square-${position}`}
      isDropDisabled={!isDroppable || !isDarkSquare}
    >
      {provided => (
        <Square
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDarkSquare={isDarkSquare}
        >
          <Debug position={position} />
          {disc ? <DraggableDisc {...disc} position={position} /> : null}
          <Box sx={{ display: 'none' }}>{provided.placeholder}</Box>
        </Square>
      )}
    </Droppable>
  )
);
