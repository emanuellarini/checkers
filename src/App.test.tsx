import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  describe('Elements', () => {
    it('renders the App content', () => {
      render(<App />);
      const header = screen.getByText(/checkers game/i);
      expect(header).toBeInTheDocument();
    });
  });
});
