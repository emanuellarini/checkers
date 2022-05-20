import React, { useCallback } from 'react';
import {
  DragDropContext,
  OnDragStartResponder,
  OnDragEndResponder
} from 'react-beautiful-dnd';

import { useGame } from '../../hooks';
import { getPlayerId } from '../../lib/disc';
import {
  calculatePlayerMovablePositions,
  getCapturedDisc
} from '../../lib/movement';
import { Disc } from '../Disc';
import { Square } from '../Square';

export const Board = () => {
  const {
    discs,
    squares,
    onSetDiscNewCoordinates,
    onSetIsDroppable,
    onSetUndroppableInAll,
    onSetCapturedDisc,
    onIncrementTurnMovements
  } = useGame();

  const handleDragStart = useCallback<OnDragStartResponder>(
    ({ draggableId }) => {
      onSetUndroppableInAll();

      const discPosition = discs[draggableId];
      const player = getPlayerId(draggableId);
      const movablePositions = calculatePlayerMovablePositions(
        player,
        discs,
        squares,
        discPosition
      );

      movablePositions.forEach(p => {
        onSetIsDroppable(p);
      });
    },
    [onSetUndroppableInAll, onSetIsDroppable, discs, squares]
  );

  const handleDragEnd = useCallback<OnDragEndResponder>(
    ({ destination, source, draggableId }) => {
      if (
        !destination ||
        !source ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      )
        return;

      const [, position] = destination.droppableId.split('-');

      onSetDiscNewCoordinates({
        discId: draggableId,
        newPosition: Number(position)
      });

      const capturedDisc = getCapturedDisc(
        discs,
        draggableId,
        Number(position)
      );
      if (capturedDisc) {
        onSetCapturedDisc(capturedDisc);
      }

      onIncrementTurnMovements();
    },
    [
      onSetCapturedDisc,
      onSetDiscNewCoordinates,
      discs,
      onIncrementTurnMovements
    ]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {Array.from({ length: 64 }).map((_, p) => (
        <Square key={`square-${p}`} position={p}>
          <Disc key={`disc-${p}`} position={p} />
        </Square>
      ))}
    </DragDropContext>
  );
};
