
const maxAge = 90*24*60*60


export default defineEventHandler(async (event) => {

    let tokenUrl =
  "https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zybl_004/oauth2/token";

    const { refresh } = getHeaders(event);

    const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          contentType: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: "0344f56d-3123-4cb8-ba82-be48f6baa789",
            grant_type: "refresh_token",
            refresh_token: refresh as string
        })
    })

    const { refresh_token, customer_id, access_token, usid } =  await response.json();

    setCookie(event, 'session', JSON.stringify({usid, customer_id, access_token, refresh_token} ));
    setCookie(event, 'refresh_token', JSON.stringify({refresh_token} ), {
        maxAge,
        path: '/',
        sameSite: 'lax',
    });


    return { refresh_token, customer_id, token: access_token, usid};
});
