import { defineStore } from 'pinia'
export const useSessionStore = defineStore('session', {
  state: () => ({
    session: {}
  }),
  actions: {
    setSession(value, from = 'unknow') {
      console.log(`Setting cookie: ${from}`);
      this.session = value
    },
  },
  persist: true
})