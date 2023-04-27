import { storeToRefs } from "pinia";
import { useBasketStore } from "~/store/basket";

export const useBasket = () => {
  const store = useBasketStore();

  const { basket, products, showBasket, totalItems } = storeToRefs(store);

  const getBasket = async () => {
    const { data: basketRef } = await useFetch("/api/basket");
    return basketRef;
  };

  const setBasket = (value) => {
    store.setBasket(value)
  }

  const addItem = async (productId, qty = 1) => {
    store.addItem(productId, qty)
  };

  const remove = async(productId) => {
    store.remove(productId)
  }

  const getFullProducts = () => {
    store.getProducts();
  }

  
  const toggle = () => {
    store.toggle();
  }

  return {
    toggle, 
    setBasket,
    remove,
    getFullProducts,
    getBasket,
    addItem,

    totalItems,
    basket,
    showBasket,
    products
  };
};
