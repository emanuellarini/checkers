import React, { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Player } from '@checkers/game-interfaces';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useRoom } from '../../hooks';
import { Input } from '../Form';

type FormData = Pick<Player, 'name' | 'email'>;

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'This field must have a minimum of 3 characters')
    .max(20, 'This field must have a maximum of 20 characters')
    .required('This field is required'),
  email: Yup.string().email('Invalid e-mail').required('This field is required')
});

export const PlayerForm = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const { onCreateRoom, onJoinRoom } = useRoom();
  const formRef = useRef<FormHandles>(null);
  const [submitting, setIsSubmitting] = useState(false);

  const isCreatingGame = !gameId;

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    async data => {
      setIsSubmitting(true);

      try {
        formRef?.current?.setErrors({});

        await formSchema.validate(data, {
          abortEarly: false
        });

        if (isCreatingGame) {
          const newGameId = await onCreateRoom({ player: data });

          if (!newGameId) {
            setIsSubmitting(false); // error is handled in Provider already
            return;
          }
          await navigate(`/${newGameId}`);
        } else {
          const hasJoined = await onJoinRoom({ player: data, gameId });
          if (!hasJoined) {
            setIsSubmitting(false);
          }
        }
      } catch (err) {
        setIsSubmitting(false);
        if (err instanceof Yup.ValidationError) {
          const validationErrors: { [k: string]: string } = {};
          if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
              if (error.path) {
                validationErrors[error.path] = error.message;
              }
            });

            formRef?.current?.setErrors(validationErrors);
          }
        }
      }
    },
    [
      setIsSubmitting,
      onJoinRoom,
      onCreateRoom,
      navigate,
      isCreatingGame,
      gameId
    ]
  );

  return (
    <Dialog
      open
      aria-describedby="alert-dialog-slide-description"
      BackdropComponent={() => <div />}
      PaperProps={{ elevation: 4 }}
    >
      <DialogTitle id="alert-dialog-slide-description">
        {isCreatingGame ? 'New Game' : 'Current Game'}
      </DialogTitle>
      <DialogContent sx={{ minWidth: '30em' }}>
        {isCreatingGame && (
          <Typography variant="subtitle2" sx={{ mb: 3 }}>
            After creating, copy its Link and send to a friend to start playing
            with him/her
          </Typography>
        )}
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Input id="name" name="name" label="Name" autoFocus />
            <Input id="email" name="email" label="E-mail" />
            <DialogActions>
              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                value="join_create_room"
                loading={submitting}
                sx={{ mt: 2, alignSelf: 'flex-end' }}
              >
                {isCreatingGame ? 'Create' : 'Join'}
              </LoadingButton>
            </DialogActions>
          </Box>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
