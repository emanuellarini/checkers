import gravatar from 'gravatar';

const getAvatarUrl = (email: string) =>
  gravatar.url(email, {
    protocol: 'https',
    size: '100px',
    d: '404'
  });

export const getDefaultPlayer = ({ name = '', email = '' }) => ({
  name,
  email,
  avatarUrl: getAvatarUrl(email),
  gameStats: {
    wins: 0,
    losses: 0,
    capturedDiscs: 0,
    capturedKings: 0
  }
});
