import React, { useCallback, useRef, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Alert, Container, Paper, Snackbar, Typography } from '@mui/material';
import { navigate } from '@reach/router';
import { RouteComponentProps } from '@reach/router';
import { Scope, FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { DefaultHeader, Input } from '../components';
import { createGameId } from '../lib/gameId';
import { createNewGame } from '../services/firebase';

type FormData = {
  gameId: string;
  player1: {
    name: string;
    email: string;
  };
  player2: {
    name: string;
    email: string;
  };
};

const getInitialValues = () => ({
  gameId: createGameId(),
  player1: {
    name: '',
    email: ''
  },
  player2: {
    name: '',
    email: ''
  }
});

export const Main: React.FC<RouteComponentProps> = () => {
  const formRef = useRef<FormHandles>(null);
  const [submitting, setIsSubmitting] = useState(false);
  const [error, setHasError] = useState<string>('');

  const handleClose = useCallback(() => setHasError(''), [setHasError]);

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    async (data, { reset }) => {
      setIsSubmitting(true);
      handleClose();
      try {
        formRef?.current?.setErrors({});

        const schema = Yup.object().shape({
          gameId: Yup.string()
            .min(8, 'This field must have a minimum of 8 characters')
            .max(12, 'This field must have a maximum of 12 characters')
            .required('This field is required'),
          player1: Yup.object().shape({
            name: Yup.string()
              .min(3, 'This field must have a minimum of 3 characters')
              .max(20, 'This field must have a maximum of 20 characters')
              .required('This field is required'),
            email: Yup.string()
              .email('Invalid e-mail')
              .required('This field is required')
          }),
          player2: Yup.object().shape({
            name: Yup.string()
              .min(3, 'This field must have a minimum of 3 characters')
              .max(20, 'This field must have a maximum of 20 characters')
              .required('This field is required'),
            email: Yup.string()
              .email('Invalid e-mail')
              .required('This field is required')
          })
        });
        await schema.validate(data, {
          abortEarly: false
        });
        const gameId = await createNewGame(data);
        setIsSubmitting(false);

        if (!gameId) {
          setHasError('Unable to create a new game. Try again later.');
          return;
        }

        reset();
        await navigate(`/${gameId}`);
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
    [handleClose, setIsSubmitting, setHasError]
  );

  return (
    <>
      <DefaultHeader />

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Unable to create game. Try again later.
        </Alert>
      </Snackbar>

      <Form
        onSubmit={handleSubmit}
        ref={formRef}
        initialData={getInitialValues()}
      >
        <Container
          sx={{
            mt: 1,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            minHeight: '100%'
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 2,
              mt: 2,
              mx: 'auto',
              minWidth: '30em',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
              Create New Game
            </Typography>
            <Input
              name="gameId"
              label="Game ID"
              helperText="You can provide your own game id "
            />
            <Scope path="player1">
              <Input id="player1.name" name="name" label="Player 1 Name" />
              <Input id="player1.email" name="email" label="Player 1 E-mail" />
            </Scope>
            <Scope path="player2">
              <Input id="player2.name" name="name" label="Player 2 Name" />
              <Input id="player2.email" name="email" label="Player 2 E-mail" />
            </Scope>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={submitting}
              sx={{ mt: 2, alignSelf: 'flex-end' }}
            >
              Create
            </LoadingButton>
          </Paper>
        </Container>
      </Form>
    </>
  );
};
