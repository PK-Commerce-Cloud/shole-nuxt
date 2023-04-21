export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { session } = JSON.parse(getCookie(event, "session") || "{}");
  const basket = JSON.parse(getCookie(event, "basket") || "{}");
  const id = event.context.params?.id || basket.basketId;
  if (session?.access_token && id) {
    const data = await fetch(
      `https://kv7kzm78.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/f_ecom_zybl_004/baskets/${id}/items?siteId=SohleCrew`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
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