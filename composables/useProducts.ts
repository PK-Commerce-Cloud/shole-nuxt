import { storeToRefs } from "pinia";
import { useProductsStore } from "~/store/products";

export const useProducts = () => {
  const store = useProductsStore();

  const { products } = storeToRefs(store);

  const getProducts = async (category = "newarrivals", limit = 25) => {
    let { data: productsResponse } = await useFetch(
      `/api/products/${category}?limit=${limit}`
    );
    return productsResponse;
  };

  const getProduct = async (id) => {
    let {data: productRef} = await useFetch(`/api/products?id=${id}`);
    return productRef;
  };

  const getCategories = async (category = "root", levels = 1) => {
    let { data: categoryRef } = await useFetch(
      `/api/categories/${category}?levels=${levels}`
    );

    return categoryRef;
  };

  const filterProducts = async (
    category = "newarrivals",
    limit = 25,
    query = {}
  ) => {
    let { data: filterProductsRef } = await useFetch(
      () => `/api/products/${category}?limit=${limit}`,
      { query }
    );

    store.setProducts(filterProductsRef.value);
  };

  return {
    getProducts,
    getCategories,
    getProduct,
    filterProducts,
    products,
  };
};
