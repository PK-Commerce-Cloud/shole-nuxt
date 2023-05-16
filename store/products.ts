import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: {},
    loading: true,
    showProductView: false,
    product: {}
  }),
  actions: {
    setProducts(value) {
      this.products = value;
      this.loading = false;
    },
    async setProduct(id: string) {
      const { data: fullProduct } = await useFetch(`/api/products?id=${id}&allImages=true`);
      this.product = fullProduct.value;
      this.showProductView = true;
    },
    toggleQuickView() {
      this.showProductView = !this.showProductView;
    }
  }
});