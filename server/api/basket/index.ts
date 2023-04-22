export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const data = await _fetch(event, 
    `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/baskets?siteId=${runtimeConfig.public.channel_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{}",
    }
  );

  const json = await data.json();

  if (json.basketIds) {
    const fetchBasket = await _fetch(event, 
      `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/baskets/${json?.basketIds}?siteId=${runtimeConfig.public.channel_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newBasket = await fetchBasket.json();

    return newBasket;
  }

  return json;
});
