import React, { useCallback } from 'react';
import {
  DragDropContext,
  OnDragStartResponder,
  OnDragEndResponder
} from 'react-beautiful-dnd';

import { useGame } from '../../hooks';
import {
  calculatePlayerMovablePositions,
  getCapturedDiscPosition,
  calculatePlayerMovablePositionsWhenMultiCapturing
} from '../../lib/movement';
import { Square } from '../Square';

export const Board = () => {
  const {
    board,
    players,
    turn,
    onMoveDisc,
    onSetIsDroppable,
    onSetUndroppableInAll,
    onSetCapturedDisc,
    onIncrementTurnMovements
  } = useGame();

  const handleDragStart = useCallback<OnDragStartResponder>(
    ({ draggableId }) => {
      onSetUndroppableInAll();
      const [, position] = draggableId.split('/');
      let movablePositions;

      if (players[turn].turnMovements > 0) {
        movablePositions = calculatePlayerMovablePositionsWhenMultiCapturing(
          turn,
          board,
          position
        );
      } else {
        movablePositions = calculatePlayerMovablePositions(
          turn,
          board,
          position
        );
      }

      movablePositions.forEach(p => {
        onSetIsDroppable(p);
      });
    },
    [onSetUndroppableInAll, onSetIsDroppable, board, players, turn]
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

      onMoveDisc({
        currentPosition,
        newPosition
      });

      const capturedPosition = getCapturedDiscPosition(
        board,
        currentPosition,
        newPosition
      );

      if (capturedPosition) {
        onSetCapturedDisc(capturedPosition);
      }

      onIncrementTurnMovements();
    },
    [onIncrementTurnMovements, onMoveDisc, onSetCapturedDisc, board]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {Object.keys(board).map(position => (
        <Square
          {...board[position]}
          key={`square-${position}`}
          position={position}
        />
      ))}
    </DragDropContext>
  );
};
