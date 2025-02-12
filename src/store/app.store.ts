import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginCredentials } from '../types';

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (credentials: LoginCredentials) => {
        if (credentials.username && credentials.password) {
          set({ isAuthenticated: true, user: { username: credentials.username } });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;