import React, { useCallback } from 'react';
import {
  DragDropContext,
  OnDragStartResponder,
  OnDragEndResponder
} from 'react-beautiful-dnd';

import { useGame } from '../../hooks';
import { DroppableSquare } from '../Square';

export const Board = () => {
  const { squares, discs, onStartMovement, onEndMovement, movablePositions } =
    useGame();

  const handleDragStart = useCallback<OnDragStartResponder>(
    ({ draggableId }) => onStartMovement(Number(draggableId)),
    [onStartMovement]
  );

  const handleDragEnd = useCallback<OnDragEndResponder>(
    ({ destination, source }) => {
      if (
        !destination ||
        !source ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      )
        return;

      const [, currentPosition] = source.droppableId.split('-');
      const [, newPosition] = destination.droppableId.split('-');

      onEndMovement(Number(currentPosition), Number(newPosition));
    },
    [onEndMovement]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {squares.map(square => (
        <DroppableSquare
          isDroppable={movablePositions.includes(square.position)}
          isDarkSquare={square.isDarkSquare}
          disc={discs.find(disc => Number(disc.position) === square.position)}
          key={`square-${square.position}`}
          position={square.position}
        />
      ))}
    </DragDropContext>
  );
};
