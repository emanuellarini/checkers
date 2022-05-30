import { useLocalStorage } from 'usehooks-ts';

export const useProfile = () => {
  const [profile, setProfile] = useLocalStorage<Pick<
    Player,
    'name' | 'email'
  > | null>('profile', null);

  return {
    profile,
    setProfile
  };
};
