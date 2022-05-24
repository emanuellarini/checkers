import React, { useCallback } from 'react';
import {
  DragDropContext,
  OnDragStartResponder,
  OnDragEndResponder
} from 'react-beautiful-dnd';

import { useGame } from '../../hooks';
import { DroppableSquare } from '../Square';

export const Board = () => {
  const { board, onStartMovement, onEndMovement, movablePositions } = useGame();

  const handleDragStart = useCallback<OnDragStartResponder>(
    ({ draggableId }) => onStartMovement(draggableId),
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

      onEndMovement(currentPosition, newPosition);
    },
    [onEndMovement]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {Object.keys(board).map(position => (
        <DroppableSquare
          isDroppable={movablePositions.includes(position)}
          isDarkSquare={board[position].isDarkSquare}
          disc={board[position].disc}
          key={`square-${position}`}
          position={position}
        />
      ))}
    </DragDropContext>
  );
};
