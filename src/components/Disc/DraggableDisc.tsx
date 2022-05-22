import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useGame } from '../../hooks';
import { Disc } from './Disc';

export type DraggableDiscProps = Disc & {
  position: Position;
};

export const DraggableDisc: React.FC<DraggableDiscProps> = memo(
  ({ position, isKing = false, player }) => {
    const { turn } = useGame();

    return (
      <Draggable
        draggableId={position}
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
