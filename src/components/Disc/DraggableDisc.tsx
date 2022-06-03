import React, { memo, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useRoom } from '../../hooks';
import { Disc } from './Disc';

export const DraggableDisc: React.FC<Disc> = memo(
  ({ position, isKing = false, player }) => {
    const { turn, sessionId, players } = useRoom();

    const isDraggableByCurrentPlayer = useMemo(() => {
      const currentSessionPlayer = players.find(p => p.sessionId === sessionId);

      return turn === player && turn === currentSessionPlayer?.id;
    }, [player, turn, players, sessionId]);

    return (
      <Draggable
        draggableId={position.toString()}
        index={position}
        isDragDisabled={!isDraggableByCurrentPlayer}
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
              isDraggableByCurrentPlayer={isDraggableByCurrentPlayer}
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
