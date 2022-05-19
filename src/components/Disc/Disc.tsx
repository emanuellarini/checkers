import React, { memo, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Paper } from '@mui/material';

import { useGame } from '../../hooks';
import { getPlayerId } from '../../lib/disc';
import { KingDiscIcon } from './KingDiscIcon';

export type DiscProps = {
  position: number;
};

export const Disc: React.FC<DiscProps> = memo(({ position }) => {
  const { discs, turn } = useGame();

  const { player, disc } = useMemo(() => {
    const discKey = Object.keys(discs).find(id => discs[id] === position);

    if (discKey) {
      return {
        player: getPlayerId(discKey),
        disc: {
          key: discKey,
          position: discs[discKey]
        }
      };
    }

    return {
      player: null,
      disc: null
    };
  }, [discs, position]);

  if (!player || !disc) return null;

  return (
    <Draggable
      draggableId={disc.key}
      index={disc.position}
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
        >
          <Paper
            elevation={snapshot.isDragging ? 24 : 6}
            component="div"
            aria-label="Disc"
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `player${player}.main`,
              pb: '90%',
              width: '90%',
              m: '5%',
              border: 1,
              borderRadius: '50%',
              borderColor: 'common.white',
              borderStyle: 'double'
            }}
          >
            {disc.key.startsWith('king') && <KingDiscIcon />}
          </Paper>
        </div>
      )}
    </Draggable>
  );
});
