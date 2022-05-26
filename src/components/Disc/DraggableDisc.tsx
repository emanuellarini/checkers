import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useGame } from '../../hooks';
import { Disc } from './Disc';

export const DraggableDisc: React.FC<Disc> = memo(
  ({ position, isKing = false, player }) => {
    const { turn } = useGame();

    return (
      <Draggable
        draggableId={position.toString()}
        index={position}
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
            <Disc
              isKing={isKing}
              isDragging={snapshot.isDragging}
              player={player}
            />
          </div>
        )}
      </Draggable>
    );
  }
);
