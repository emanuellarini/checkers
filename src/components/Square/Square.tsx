import React, { memo, useMemo } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Box } from '@mui/material';

import { DraggableDisc } from '../Disc';
import { Debug } from './Debug';

export type SquareProps = Square & {
  position: Position;
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

export const Square: React.FC<SquareProps> = memo(
  ({ position, disc, isDroppable, isDarkSquare }) => {
    const squareStyle = useMemo(
      () => getSquareStyle(isDarkSquare),
      [isDarkSquare]
    );

    return (
      <Droppable
        droppableId={`square-${position}`}
        isDropDisabled={!isDroppable || !isDarkSquare}
      >
        {provided => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={squareStyle}
            aria-label="Square"
          >
            <Debug position={position} />
            {disc ? <DraggableDisc {...disc} position={position} /> : null}
            <Box sx={{ display: 'none' }}>{provided.placeholder}</Box>
          </Box>
        )}
      </Droppable>
    );
  }
);
