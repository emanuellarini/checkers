import { useSessionStorage } from './useSessionStorage';

export const useProfile = () => {
  const [profile, setProfile] = useSessionStorage<Pick<
    Player,
    'name' | 'email'
  > | null>('profile', null);

  return {
    profile,
    setProfile
  };
};
