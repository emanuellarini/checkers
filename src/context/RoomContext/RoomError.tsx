import React, { memo } from 'react';

import { Button, Alert, Snackbar } from '@mui/material';
import { ErrorCode } from 'colyseus.js';
import { useRouter } from 'next/router';

type Code = number;
type RoomErrorProps = { code?: Code | null; onClose: () => void };

type ErrorType = {
  message: React.ReactNode;
  action?: {
    label: string;
    goToRoute: string;
  };
};

const errorMap: { [k: Code]: ErrorType } = {
  [ErrorCode.MATCHMAKE_INVALID_CRITERIA]: {
    message: 'Could not find the room you were looking for',
    action: {
      label: 'Create New Room',
      goToRoute: '/'
    }
  },
  [ErrorCode.MATCHMAKE_INVALID_ROOM_ID]: {
    message: 'This room is not available to join'
  },
  [ErrorCode.MATCHMAKE_EXPIRED]: {
    message: 'Your access to this game have expired'
  }
};

export const RoomError: React.FC<RoomErrorProps> = memo(({ code, onClose }) => {
  const router = useRouter();

  if (!code) return null;

  let error: ErrorType = {
    message: 'Something bad happened. Try doing this action later.'
  };

  if (errorMap[code]) {
    error = errorMap[code];
  }

  return (
    <Snackbar open autoHideDuration={3000} onClose={onClose}>
      <Alert
        variant="filled"
        onClose={onClose}
        severity="error"
        action={
          error.action && (
            <Button
              color="inherit"
              size="small"
              onClick={() =>
                error.action && router.push(error.action.goToRoute)
              }
            >
              {error.action.label}
            </Button>
          )
        }
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
});
