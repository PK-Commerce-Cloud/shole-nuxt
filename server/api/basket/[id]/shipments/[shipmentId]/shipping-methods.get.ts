export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
  
    const basketId = event.context.params?.id;
  
    const shipmentId = event.context.params?.shipmentId;
  
    if (basketId && shipmentId) {
      const data = await _fetch(event, 
        `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/baskets/${basketId}/shipments/${shipmentId}/shipping-methods?siteId=${runtimeConfig.public.channel_id}`,
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
      basketId,
      shipmentId
    }
  });