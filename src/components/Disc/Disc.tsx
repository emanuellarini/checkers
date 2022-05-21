import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Paper } from '@mui/material';

import { useGame } from '../../hooks';
import { KingDiscIcon } from './KingDiscIcon';

export type DiscProps = Disc & {
  position: Position;
};

export const Disc: React.FC<DiscProps> = memo(
  ({ position, isKing = false, player }) => {
    const { turn } = useGame();

    return (
      <Draggable
        draggableId={`${player}/${position}`}
        index={Number(position)}
        isDragDisabled={turn !== player}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            role="button"
            aria-label="Disc"
          >
            <Paper
              elevation={snapshot.isDragging ? 24 : 6}
              component="div"
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `player${player}.main`,
                pb: '90%',
                width: '90%',
                m: '5%',
                border: 1,
                borderRadius: '50%',
                borderColor: 'common.white',
                borderStyle: 'double'
              }}
            >
              {isKing ? <KingDiscIcon /> : null}
            </Paper>
          </div>
        )}
      </Draggable>
    );
  }
);
