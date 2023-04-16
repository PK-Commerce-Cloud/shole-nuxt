// store/basket.ts
import { defineStore } from 'pinia'
export const useBasketStore = defineStore('basket', {
  state: () => ({
    basket: null,
  }),
  actions: {
    createBasket(basket) {
      this.basket = basket
    }
  },
  persist: true
})