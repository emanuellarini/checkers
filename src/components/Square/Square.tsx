import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Box } from '@mui/material';

import { Disc } from '../Disc';
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
    if (!isDarkSquare) {
      return <Box sx={getSquareStyle()} aria-label="Square" />;
    }

    return (
      <Droppable
        droppableId={`square-${position}`}
        isDropDisabled={!isDroppable}
      >
        {provided => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={getSquareStyle(isDarkSquare)}
            aria-label="Square"
          >
            <Debug position={position} />
            {disc ? <Disc {...disc} position={position} /> : null}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    );
  },
  (prev, next) =>
    prev.disc !== next.disc && prev.isDroppable !== next.isDroppable
);
