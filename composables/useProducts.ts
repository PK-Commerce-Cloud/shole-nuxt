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


        const { data: categories } = await useAsyncData('categories', () => $fetch(`https://kv7kzm78.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/f_ecom_zybl_004/categories/${category}?siteId=SohleCrew&levels=${levels}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            mode: "no-cors"
        }) )

        return categories;
    }

    return {
        getProducts,
        getCategories,
    }
}