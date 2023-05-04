import { storeToRefs } from "pinia";
import { useBasketStore } from "~/store/basket";

export const useBasket = () => {
  const store = useBasketStore();

  const {
    basket,
    products,
    showBasket,
    totalItems,
    shippingMethods,
    payments,
    checkout,
  } = storeToRefs(store);

  const getBasket = async () => {
    const { data: basketRef } = await useFetch("/api/basket");
    return basketRef;
  };

  const setBasket = (value) => {
    store.setBasket(value);
  };

  const addItem = async (productId, qty = 1) => {
    store.addItem(productId, qty);
  };

  const remove = async (productId) => {
    store.remove(productId);
  };

  const getFullProducts = () => {
    store.getProducts();
  };

  const updateShippingAddress = async (payload) => {
    const { data } = await useFetch(
      `/api/basket/${basket.value.basketId}/shipments/${basket.value.shipments[0].shipmentId}`,
      {
        method: "PATCH",
        body: payload,
      }
    );

    store.setBasket(data.value);

    return data;
  };

  const updateBillingAddress = async (payload) => {
    const { data } = await useFetch(
      `/api/basket/${basket.value.basketId}/billing-address`,
      {
        method: "PUT",
        body: payload,
      }
    );

    store.setBasket(data.value);

    return data;
  };

  const addPaymentInstrument = async (payload) => {
    const { data } = await useFetch(
      `/api/basket/${basket.value.basketId}/payment-instruments`,
      {
        method: "POST",
        body: payload,
      }
    );

    store.setBasket(data.value);

    return data;
  };

  const createOrder = async () => {


    console.log(basket.value.basketId)

    const { data } = await useFetch(`/api/orders`, {
      method: "POST",
      body: {
        basketId: basket.value.basketId,
      },
    });

    store.setBasket(data.value);

    return data;
  };

  const getShippingMethods = () => {
    store.getShippingMethods();
  };

  const getPayments = () => {
    store.getPayments();
  };

  const toggle = () => {
    store.toggle();
  };

  return {
    toggle,
    setBasket,
    remove,
    getFullProducts,
    getBasket,
    addItem,
    getShippingMethods,
    getPayments,
    updateShippingAddress,
    addPaymentInstrument,
    createOrder,
    updateBillingAddress,
    totalItems,
    basket,
    showBasket,
    products,
    shippingMethods,
    store,
    payments,
    checkout,
  };
};
