import React, { useCallback, useEffect, useState } from 'react';

import { ArrowRightAlt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Paper,
  Typography,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { useRouter } from 'next/router';

import { DefaultHeaderLayout, Loading } from '../../components';
import { useProfile, useLobby, useRoom } from '../../hooks';

const Rooms = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { onCreateRoom } = useRoom();
  const { rooms } = useLobby();
  const { profile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!profile?.name) {
      router.push('/');
    }
  }, [router, profile?.name]);

  const handleCreate = useCallback(async () => {
    if (!profile?.name) return;
    setIsCreating(true);
    const gameId = await onCreateRoom({ player: profile });
    if (!gameId) {
      setIsCreating(false);
    } else {
      await router.push(`/rooms/${gameId}`);
    }
  }, [onCreateRoom, profile, router]);

  if (!profile?.name) {
    return <Loading />;
  }

  return (
    <DefaultHeaderLayout>
      <Paper
        elevation={4}
        sx={{
          p: 2,
          mt: 4,
          mx: 'auto',
          width: '27em',
          maxWidth: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" component="h1" sx={{ textAlign: 'center' }}>
          Rooms
        </Typography>

        <MenuList>
          {!rooms.length && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography variant="subtitle1" component="div" sx={{ mt: 0 }}>
                No rooms available at this time
              </Typography>

              <LoadingButton
                loading={isCreating}
                variant="contained"
                onClick={handleCreate}
                sx={{ mt: 3 }}
              >
                Create New Game
              </LoadingButton>
            </Box>
          )}
          {rooms.map(({ roomId }) => (
            <MenuItem
              key={roomId}
              onClick={() => router.push(`/rooms/${roomId}`)}
            >
              <ListItemText>Game {roomId}</ListItemText>
              <ListItemIcon>
                <ArrowRightAlt />
              </ListItemIcon>
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </DefaultHeaderLayout>
  );
};

export default Rooms;
