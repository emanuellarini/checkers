export const getDefaultPlayer = ({ name = '', email = '' }) => ({
  name,
  email,
  gameStats: {
    wins: 0,
    losses: 0,
    capturedDiscs: 0,
    capturedKings: 0
  }
});
