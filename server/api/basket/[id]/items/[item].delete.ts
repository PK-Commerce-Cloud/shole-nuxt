export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const basketId = event.context.params?.id;

  const itemId = event.context.params?.item;

  if (basketId && itemId) {
    const data = await _fetch(event, 
      `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/baskets/${basketId}/items/${itemId}?siteId=${runtimeConfig.public.channel_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    const json = await data.json();

    return json;
  }
});