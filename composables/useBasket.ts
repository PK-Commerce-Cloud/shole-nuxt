import { useBasketStore } from "~/store/basket";
import { useUser } from "./useUser";


export const useBasket = async () => {

  /*   const store = useBasketStore()
    
    const { session  } = await useUser();

    const token = session.value?.access_token;

    const fetchBasket = async () => {
        let url = `https://kv7kzm78.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/f_ecom_zybl_004/baskets/${store.basket?.basketId}?siteId=SohleCrew`;
        const { data } = await useAsyncData('basket',async () => $fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }))

        store.createBasket(data.value);
    }


    const getBasket = async () => {
        const { data, error } = await useAsyncData('basket', async () => $fetch('https://kv7kzm78.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/f_ecom_zybl_004/baskets?siteId=SohleCrew', {
            method:'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({}),
            mode: "no-cors"
        }))


        store.createBasket(error.value?.data.basketIds ? {
            basketId: error.value?.data.basketIds,
            error: error
        } : data.value);
    }


    return {
        getBasket,
        fetchBasket
    } */
}