export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    
    const body = await readBody(event);
  
    const basketId = event.context.params?.id;
  
    const shipmentId = event.context.params?.shipmentId;
  
    if (basketId && shipmentId) {
      const data = await _fetch(event, 
        `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/baskets/${basketId}/shipments/${shipmentId}?siteId=${runtimeConfig.public.channel_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );
      

      const json = await data.json();

      console.log(json, shipmentId)
  
      return json;
    }

    return {
      basketId,
      shipmentId
    }
  });