export const useProducts = () => {
  const call = async (url: string) => {
    return useFetch(url);
  };

  const getProducts = () =>
    call(
      "/api/products/newarrivals-mens"
    );

  const getCategories = (category = "root", levels = 1) =>
    call(`/api/categories/${category}?levels=${levels}`);

  return {
    getProducts,
    getCategories,
  };
};
