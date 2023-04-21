export default defineEventHandler(async (event) => {
  const category = event.context.params?.category || "newarrivals-mens";

  const { session } = JSON.parse(getCookie(event, "session") || "{}");

  const fetchBasket = await fetch(
    `https://kv7kzm78.api.commercecloud.salesforce.com/search/shopper-search/v1/organizations/f_ecom_zybl_004/product-search?siteId=RefArch&refine=cgid=${category}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const products = await fetchBasket.json();

  return products;
});

