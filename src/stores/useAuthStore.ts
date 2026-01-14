import { create } from 'zustand';
import type { User } from '@/types';

const TOKEN_KEY = 'accessToken';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  setAuth: (user, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ user, token, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null, token: null, isLoggedIn: false });
  },

  initialize: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      set({ token, isLoggedIn: true });
    }
  },
}));
