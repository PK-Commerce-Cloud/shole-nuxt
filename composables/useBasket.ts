import { storeToRefs } from "pinia";
import { useBasketStore } from "~/store/basket";

export const useBasket = () => {
  const store = useBasketStore();

  const { basket } = storeToRefs(store);

  const getBasket = async () => {
    const { data } = await useFetch("/api/basket");

    store.setBasket(data.value, "getBasket");

    return basket;
  };

  const addItem = async (id, qty = 1) => {
    const { data, error } = await useFetch(`/api/basket/${basket.value?.basketId}/items`, {
      method: "POST",
      body: [
        {
          productId: id,
          quantity: qty,
        },
      ],
    });

    store.setBasket(data.value, "addItem");

    return basket;
  };

  return {
    getBasket,
    addItem,
  };
};
