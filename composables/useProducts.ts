export const useProducts = () => {
  const call = async (url: string) => {
    return useFetch(url);
  };

  const getProducts = (category = 'newarrivals', limit = 25) =>
    call(
      `/api/products/${category}?limit=${limit}`
    );

  const getProduct = (id) =>
    call(
      `/api/products?id=${id}`
    );

  const getCategories = (category = "root", levels = 1) =>
    call(`/api/categories/${category}?levels=${levels}`);

  return {
    getProducts,
    getCategories,
    getProduct
  };
};
