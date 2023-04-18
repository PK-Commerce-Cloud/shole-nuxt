import { storeToRefs } from "pinia";
import { useSessionStore } from "~/store/session";

export const useProducts = async () => {
  const call = async (url: string) => {
    const store = useSessionStore();
    const cookie = storeToRefs(store);

    const token = cookie.session.value.access_token;

    return useFetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "no-cors",
    });
  };

  const getProducts = async () =>
    call(
      "https://kv7kzm78.api.commercecloud.salesforce.com/search/shopper-search/v1/organizations/f_ecom_zybl_004/product-search?siteId=SohleCrew&refine=cgid=newarrivals-mens"
    );

  const getCategories = async (category = "root", levels = 1) =>
    call(
      `https://kv7kzm78.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/f_ecom_zybl_004/categories/${category}?siteId=SohleCrew&levels=${levels}`
    );

  return {
    getProducts,
    getCategories,
  };
};
