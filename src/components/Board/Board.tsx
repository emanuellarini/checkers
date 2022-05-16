import React, { useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Square } from '../Square';

export const Board = () => {
  const handleDragEnd = useCallback(() => {
    console.log('drag');
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {Array.from({ length: 8 }).map((_, x) =>
        Array.from({ length: 8 }).map((_, y) => (
          <Square key={`square-${x}-${y}`} x={x} y={y} />
        ))
      )}
    </DragDropContext>
  );
};
