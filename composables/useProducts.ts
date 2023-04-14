import { useUser } from "./useUser";

export const useProducts = async () => {
    const { token } = await useUser();
    
    const getProducts = async (category = 'newarrivals-mens') => {

        const { data: products } = await useAsyncData('products', () => $fetch(`https://kv7kzm78.api.commercecloud.salesforce.com/search/shopper-search/v1/organizations/f_ecom_zybl_004/product-search?siteId=SohleCrew&refine=cgid=${category}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            mode: "no-cors"
        }) )

        return products;
    }


    const getCategories = async (category = 'root', levels = 1) => {
        const response = await fetch(`https://kv7kzm78.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/f_ecom_zybl_004/categories/${category}?siteId=SohleCrew&levels=${levels}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let json = await response.json();
        return json;
    }

    return {
        getProducts,
        getCategories,
    }
}