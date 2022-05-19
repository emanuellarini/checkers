import React, { useCallback } from 'react';
import {
  DragDropContext,
  OnDragStartResponder,
  OnDragEndResponder
} from 'react-beautiful-dnd';

import { useGame } from '../../hooks';
import { getPlayerId } from '../../lib/disc';
import { Disc } from '../Disc';
import { Square } from '../Square';

export const Board = () => {
  const {
    discs,
    turn,
    squares,
    onSetDiscNewCoordinates,
    onSetTurn,
    onSetIsDroppable,
    onSetUndroppableInAll
  } = useGame();

  const handleDragStart = useCallback<OnDragStartResponder>(
    ({ draggableId }) => {
      const discPosition = discs[draggableId];
      const player = getPlayerId(draggableId);
      if (player === 1) {
        const upperLeft = discPosition - 7;
        squares.hasOwnProperty(upperLeft) &&
          !Object.values(discs).some(p => p === upperLeft) &&
          onSetIsDroppable(upperLeft);

        const upperRight = discPosition - 9;
        squares.hasOwnProperty(upperRight) && // possible move
          !Object.values(discs).some(p => p === upperRight) && // no disc there
          onSetIsDroppable(upperRight);
      }

      if (player === 2) {
        const lowerLeft = discPosition + 7;
        squares.hasOwnProperty(lowerLeft) &&
          !Object.values(discs).some(p => p === lowerLeft) &&
          onSetIsDroppable(lowerLeft);

        const lowerRight = discPosition + 9;
        squares.hasOwnProperty(lowerRight) && // possible move
          !Object.values(discs).some(p => p === lowerRight) && // no disc there
          onSetIsDroppable(lowerRight);
      }
    },
    [onSetIsDroppable, discs, turn, squares]
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

      onSetTurn(prevState => (prevState === 1 ? 2 : 1));
      onSetUndroppableInAll();
    },
    [onSetDiscNewCoordinates, onSetTurn, onSetUndroppableInAll]
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
