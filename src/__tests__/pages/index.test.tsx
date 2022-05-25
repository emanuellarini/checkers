import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Index from '../../pages';

jest.mock('../../lib/gameId', () => ({
  createGameId: () => '1234'
}));

jest.mock('../../services/firebase', () => ({
  createNewGame: jest.fn()
}));

describe('Index Page', () => {
  describe('Elements', () => {
    it('renders the header and the create form', () => {
      render(<Index />);

      const header = screen.getByText(/checkers game/i);
      expect(header).toBeInTheDocument();

      const contentHeader = screen.getByText(/create new game/i);
      expect(contentHeader).toBeInTheDocument();

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
