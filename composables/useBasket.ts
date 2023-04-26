import { storeToRefs } from "pinia";
import { useBasketStore } from "~/store/basket";

export const useBasket = () => {
  const store = useBasketStore();

  const basket = ref({})
  const products = ref([])

  const { basket: storeBasket, products: storeProducts, showBasket, totalItems } = storeToRefs(store);

  const getBasket = async () => {
    const { data } = await useFetch("/api/basket");

    basket.value = data.value;

    return basket;
  };

  const setBasket = () => {
    store.setBasket(basket.value)
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
    storeBasket,
    showBasket,
    products: storeProducts,
    basket,
  };
};
