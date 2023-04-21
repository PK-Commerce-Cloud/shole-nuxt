export default defineEventHandler(async (event) => {
  const { session } = JSON.parse(getCookie(event, "session") || "{}");

  const query = getQuery(event);
  const url = new URL(
    "https://kv7kzm78.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/f_ecom_zybl_004/products?siteId=RefArch"
  );

  if (query) {
    Object.keys(query).forEach((key) => {
      query[key] && url.searchParams.append(key, query[key] as string);
    });
  }

  const fetchBasket = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    },
  });

  const products = await fetchBasket.json();

  return products;
});
