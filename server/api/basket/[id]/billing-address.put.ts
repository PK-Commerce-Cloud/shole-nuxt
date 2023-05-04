export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    
    const body = await readBody(event);
  
    const basketId = event.context.params?.id;
    
    if (basketId) {
      const data = await _fetch(event, 
        `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/baskets/${basketId}/billing-address?siteId=${runtimeConfig.public.channel_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );
      

      const json = await data.json();

      console.log(json)
  
      return json;
    }

    return {
      basketId,
      shipmentId
    }
  });