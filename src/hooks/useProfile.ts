import { useStorage } from './useStorage';

export const useProfile = () => {
  const [profile, setProfile] = useStorage<Pick<
    Player,
    'name' | 'email'
  > | null>('sessionStorage', 'profile', null);

  return {
    profile,
    setProfile
  };
};
