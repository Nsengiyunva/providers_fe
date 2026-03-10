import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ServiceProvider } from '../types';

interface AuthStore {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // API call would go here
        const mockUser = { id: '1', email, name: 'John Doe' };
        const mockToken = 'mock-token-123';
        set({ user: mockUser, token: mockToken, isAuthenticated: true });
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
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
