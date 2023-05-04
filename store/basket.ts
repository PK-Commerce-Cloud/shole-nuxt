import { defineStore } from "pinia";

export const useBasketStore = defineStore("basket", {
  state: () => ({
    basket: {},
    products: [],
    shippingMethods: {},
    payments: {},
    showBasket: false,
    checkout: {
      steps: [
        {
          index: 1,
          name: 'CustomerInfo',
          submited: false
        },
        {
          index: 2,
          name: 'ShippingInfo',
          submited: false
        },
        {
          index: 3,
          name: 'ShippingMethod',
          submited: false
        },
        {
          index: 4,
          name: 'Payment',
          submited: false
        }
      ]
    }
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
    async getShippingMethods() {
      let { data: methods } = await useFetch(
        `/api/basket/${this.basket.basketId}/shipments/${this.basket.shipments[0].shipmentId}/shipping-methods`
      );

      this.shippingMethods = methods.value;
    },
    async getPayments() {
      let { data: payments } = await useFetch(
        `/api/basket/${this.basket.basketId}/payment-methods`
      );
      this.payments = payments.value;
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

      console.log(ids)

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
