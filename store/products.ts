import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: {},
    loading: true
  }),
  actions: {
    setProducts(value) {
      this.products = value;
      this.loading = false;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
