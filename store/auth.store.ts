// eslint-disable-next-line import/no-unresolved
import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@sentry/react-native';
import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not found');

      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.log('fetchAuthenticatedUser error', error);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAuthStore;
