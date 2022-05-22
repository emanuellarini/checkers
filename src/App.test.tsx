import React from 'react';

import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  describe('Elements', () => {
    it('renders the App content', () => {
      render(<App />);

      // header
      const header = screen.getByText(/checkers game/i);
      expect(header).toBeInTheDocument();

      // board
      const discs = screen.getAllByLabelText('Disc');
      expect(discs.length).toEqual(24);

      const squares = screen.getAllByLabelText('Square');
      expect(squares.length).toEqual(64);
    });
  });
});
