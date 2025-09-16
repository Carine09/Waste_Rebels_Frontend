import { defineStore } from 'pinia';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    userId: null,  
    displayName: null,
    role: null,
  }),

  getters: {
    isAuthenticated: (state) => state.token !== null,
    isAdmin: (state) => state.role === 'ROLE_ADMIN',
    isVolunteer: (state) => state.role === 'ROLE_VOLUNTEER',
  },

  actions: {
    setToken(token) {
      this.token = token;
    },
     setUserId(userId) {
      this.userId = userId;
    },
    setDisplayName(displayName) {
      this.displayName = displayName;
    },
    setRole(role) {
      this.role = role;
    },
    logout() {
      this.token = null;
      this.userId = null;
      this.displayName = null;
      this.role = null;
      router.push('/login');
      }
    }
});
