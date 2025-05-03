import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null
  }),

  actions: {
    login(user, userid) {
      this.isLoggedIn = true
      this.user = { user, id: userid };

    },
    logout() {
      this.isLoggedIn = false
      this.user = null;
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    getUsername: (state) => state.user ? state.user.user : null,
  }
})
