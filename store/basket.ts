import { defineStore } from "pinia";

export const useBasketStore = defineStore("basket", {
  state: () => ({
    basket: {},
    products: [],
    showBasket: false,
  }),
  actions: {
    async setBasket(value) {
      this.basket = value;
    },
    async addItem(productId, qty) {
      const { data } = await useFetch(
        `/api/basket/${this.basket.basketId}/items`,
        {
          method: "POST",
          body: [
            {
              productId,
              quantity: qty,
            },
          ],
        }
      );

      this.basket = data.value;

      await this.getProducts();
      this.toggle();
    },
    async remove(itemId) {
      const { data } = await useFetch(
        `/api/basket/${this.basket.basketId}/items/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (data.value.basketId) {
        this.basket = data.value;
        await this.getProducts();
      }
    },
    async getProducts() {
      const ids = this.basket.productItems
        ?.map(({ productId }) => productId)
        .join();

      const { data } = await useFetch(`/api/products?ids=${ids}`);

      this.products = data.value;
    },
    toggle() {
      this.showBasket = !this.showBasket;
    },
  },
  getters: {
    totalItems: (state) =>
      state.basket.productItems?.reduce((prev, next) => {
        return prev + next.quantity;
      }, 0),
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
