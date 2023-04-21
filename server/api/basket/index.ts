export default defineEventHandler(async (event) => {
  const { session } = JSON.parse(getCookie(event, "session") || "{}");

  if (session?.access_token ) {
    
    const data = await fetch(
      "https://kv7kzm78.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/f_ecom_zybl_004/baskets?siteId=SohleCrew",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },
        body: "{}",
      }
    );

    const json = await data.json();

    if (json.basketIds) {
      const fetchBasket = await fetch(
        `https://kv7kzm78.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/f_ecom_zybl_004/baskets/${json?.basketIds}?siteId=SohleCrew`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newBasket = await fetchBasket.json();


      return newBasket;
    }


    return json;
  }

  return {
    
  };
});
