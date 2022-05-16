import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Paper } from '@mui/material';

import { KingDiscIcon } from './KingDiscIcon';

export type DiscProps = {
  player: 1 | 2;
  isKing?: boolean;
  index: number;
};

export const Disc: React.FC<DiscProps> = memo(
  ({ index, player = 1, isKing = false }) => (
    <Draggable draggableId={`disc-${index}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper
              elevation={snapshot.isDragging ? 24 : 6}
              component="div"
              aria-label="Disc"
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `player${player}.main`,
                pb: '70%',
                width: '70%',
                top: 0,
                left: 0,
                border: 1,
                borderRadius: '50%',
                borderColor: 'common.white',
                borderStyle: 'double'
              }}
            >
              {isKing && <KingDiscIcon />}
            </Paper>
          </div>
        );
      }}
    </Draggable>
  )
);
