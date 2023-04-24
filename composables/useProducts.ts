import { storeToRefs } from "pinia";
import { useProductsStore } from "~/store/products";

export const useProducts = () => {
  const store = useProductsStore();

  const products = ref({});

  const { products: storedProducts } = storeToRefs(store);

  const call = async (url: string, query = {}) => {
    return useFetch(() => url, { query });
  };

  const getProducts = async (category = "newarrivals", limit = 25) => {
    const { data } = await call(`/api/products/${category}?limit=${limit}`);

    products.value = data.value;

    return products;
  };

  const getProduct = (id) => call(`/api/products?id=${id}`);

  const getCategories = (category = "root", levels = 1) =>
    call(`/api/categories/${category}?levels=${levels}`);

  const filterProducts = async (
    category = "newarrivals",
    limit = 25,
    query = {}
  ) => {
    const { data } = await call(
      `/api/products/${category}?limit=${limit}`,
      query
    );

    store.setProducts(data.value);

    products.value = storedProducts.value;

    return products;

  };

  return {
    getProducts,
    getCategories,
    getProduct,
    filterProducts,
    products,
    storedProducts,
  };
};
