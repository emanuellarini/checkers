export const getDefaultPlayer = ({
  name = '',
  email = '',
  id = '',
  isBlack = true
}) => ({
  id,
  name,
  email,
  discType: isBlack ? 'black' : 'red',
  gameStats: {
    wins: 0,
    losses: 0,
    capturedDiscs: 0,
    capturedKings: 0
  }
});
