export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const body = await readBody(event);
  const { session } = JSON.parse(getCookie(event, "session") || "{}");
  const basket = JSON.parse(getCookie(event, "basket") || "{}");
  const id = event.context.params?.id || basket.basketId;
  if (session?.access_token && id) {
    const data = await _fetch(event, 
      `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/baskets/${id}/items?siteId=${runtimeConfig.public.channel_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const json = await data.json();
    return json;
  }
  return {
    body,
  };
});