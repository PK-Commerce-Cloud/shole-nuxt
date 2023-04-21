import { defineStore } from "pinia";
export const useBasketStore = defineStore("basket", {
  state: () => ({
    basket: {},
  }),
  actions: {
    setBasket(value) {
      this.basket = value;
    },
  },
  getters: {
    totalItems: (state) =>
      state.basket.productItems?.reduce((prev, next) => {
        return prev + next.quantity;
      }, 0),
    products: (state) => {
      const ids = state.basket.productItems
        ?.map(({ productId }) => productId)
        .join();

      const { data } = useFetch(`/api/products?ids=${ids}`);

      return data;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
