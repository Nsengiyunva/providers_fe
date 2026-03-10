import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'GUEST' | 'SERVICE_PROVIDER' | 'ADMIN';
}

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'GUEST' | 'SERVICE_PROVIDER';
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        try {
          const response = await authAPI.login({ email, password });
          const { user, tokens } = response.data.data;
          set({ 
            user, 
            token: tokens.accessToken, 
            isAuthenticated: true 
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      register: async (data) => {
        try {
          const response = await authAPI.register(data);
          // After registration, user needs to verify email
          // Don't auto-login, show success message instead
          return response.data;
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      },
      
      logout: async () => {
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          set({ user: null, token: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface FavoritesStore {
  favorites: string[];
  addFavorite: (providerId: string) => void;
  removeFavorite: (providerId: string) => void;
  isFavorite: (providerId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (providerId) => {
        set({ favorites: [...get().favorites, providerId] });
      },
      
      removeFavorite: (providerId) => {
        set({ favorites: get().favorites.filter(id => id !== providerId) });
      },
      
      isFavorite: (providerId) => {
        return get().favorites.includes(providerId);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
