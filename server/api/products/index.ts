export default defineEventHandler(async (event) => {

  const runtimeConfig = useRuntimeConfig();
  
  const query = getQuery(event);
  const url = new URL(`https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/product/shopper-products/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/products?siteId=${runtimeConfig.public.channel_id}`);

  if (query) {
    Object.keys(query).forEach((key) => {
      query[key] && url.searchParams.append(key, query[key] as string);
    });
  }

  const fetchBasket = await _fetch(event, url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const products = await fetchBasket.json();

  return products;
});
