import React from 'react';

import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  describe('Elements', () => {
    it('renders the header and the create form', () => {
      render(<App />);

      screen.getByText(/checkers game/i);
      screen.getByText(/create new game/i);

      screen.getByLabelText(/game id/i);
      screen.getByDisplayValue(/1234/i);
      screen.getByRole('textbox', {
        name: /player 1 name/i
      });
      screen.getByRole('textbox', {
        name: /player 1 e\-mail/i
      });
      screen.getByRole('textbox', {
        name: /player 2 name/i
      });
      screen.getByRole('textbox', {
        name: /player 2 e\-mail/i
      });

      screen.getByRole('button', {
        name: /create/i
      });
    });
  });
});
