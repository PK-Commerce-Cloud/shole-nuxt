
export default defineEventHandler(async (event) => {
  const category = event.context.params?.category || "newarrivals-mens";

  const runtimeConfig = useRuntimeConfig();

  const query = getQuery(event);
  const url = new URL(
    `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/search/shopper-search/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/product-search?siteId=${runtimeConfig.public.channel_id}&refine=cgid=${category}`
  );

  if (query) {
    Object.keys(query).forEach((key) => {
      query[key] && url.searchParams.append(key, query[key] as string);
    });
  }


  const fetchBasket = await _fetch(event, 
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const products = await fetchBasket.json();

  return products;
});

