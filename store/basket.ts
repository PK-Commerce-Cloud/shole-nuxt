import { defineStore } from 'pinia'
export const useBasketStore = defineStore('basket', {
  state: () => ({
    basket: {}
  }),
  actions: {
    setBasket(value, from = 'unknow') {
      this.basket = value
    },
  },
  persist: false
})