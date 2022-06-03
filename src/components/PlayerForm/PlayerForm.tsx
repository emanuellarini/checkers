import React, { useCallback, useRef, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { onCreateRoom, onJoinRoom } = useRoom();
  const formRef = useRef<FormHandles>(null);
  const [submitting, setIsSubmitting] = useState(false);

  const isCreatingGame = !router.query.gameId;

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    async data => {
      setIsSubmitting(true);

      try {
        const gameId = router.query.gameId as string;
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
          await router.push(`/${newGameId}`);
        } else {
          const hasJoined = await onJoinRoom({ player: data, gameId });
          if (!hasJoined) {
            setIsSubmitting(false);
          }
        }
      } catch (err) {
        setIsSubmitting(false);
        if (err instanceof Yup.ValidationError) {
          const validationErrors = {};
          if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
              // @ts-ignore
              validationErrors[error.path] = error.message;
            });

            formRef?.current?.setErrors(validationErrors);
          }
        }
      }
    },
    [setIsSubmitting, onJoinRoom, onCreateRoom, router, isCreatingGame]
  );

  return (
    <Dialog
      open
      aria-describedby="alert-dialog-slide-description"
      BackdropComponent={() => <div />}
      PaperProps={{ elevation: 4 }}
    >
      <DialogTitle id="alert-dialog-slide-description">
        {isCreatingGame ? 'Create A New Game' : 'Join Current Game'}
      </DialogTitle>
      <DialogContent sx={{ minWidth: '30em' }}>
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
                {isCreatingGame ? 'Create' : 'Start'}
              </LoadingButton>
            </DialogActions>
          </Box>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
