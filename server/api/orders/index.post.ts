export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const body = await readBody(event);

  console.log(body)

  const data = await _fetch(
    event,
    `https://${runtimeConfig.public.shortCode}.api.commercecloud.salesforce.com/checkout/shopper-orders/${runtimeConfig.public.version}/organizations/${runtimeConfig.public.organization}/orders?siteId=${runtimeConfig.public.channel_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const json = await data.json();

  console.log(json);

  return json;
});
