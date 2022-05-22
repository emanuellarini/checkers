import React, { useCallback } from 'react';
import {
  DragDropContext,
  OnDragStartResponder,
  OnDragEndResponder
} from 'react-beautiful-dnd';

import { useGame } from '../../hooks';
import { Square } from '../Square';

export const Board = () => {
  const { board, onStartMovement, onEndMovement } = useGame();

  const handleDragStart = useCallback<OnDragStartResponder>(
    ({ draggableId }) => {
      const [, position] = draggableId.split('/');

      onStartMovement(position);
    },
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
        <Square
          isDroppable={board[position].isDroppable}
          isDarkSquare={board[position].isDarkSquare}
          disc={board[position].disc}
          key={`square-${position}`}
          position={position}
        />
      ))}
    </DragDropContext>
  );
};
