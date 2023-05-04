export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
  
    const basketId = event.context.params?.id;
    
    if (basketId) {
      const data = await _fetch(event, 
        `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/baskets/${basketId}/payment-methods?siteId=${runtimeConfig.public.channel_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const json = await data.json();
  
      return json;
    }

    return {
      basketId
    }
  });