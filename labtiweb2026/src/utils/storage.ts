import { User } from '../types';

export const storage = {
  getUser(): User | null {
    try {
      const user = localStorage.getItem('usuario');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setUser(user: User): void {
    localStorage.setItem('usuario', JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem('usuario');
  },

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.rol === 'admin';
  }
};