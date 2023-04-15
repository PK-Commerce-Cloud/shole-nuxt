
export default defineEventHandler(async (event) => {

    let tokenUrl =
  "https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zybl_004/oauth2/token";

    const {code, usid} = getQuery(event);
    
    const {verifier} = getHeaders(event);

    const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          contentType: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code: code as string,
            usid: usid as string, 
            code_verifier: verifier as string,
            redirect_uri: "http://localhost:3000/api/callback",
            client_id: "0344f56d-3123-4cb8-ba82-be48f6baa789",
            channel_id: "SohleCrew",
            grant_type: "authorization_code_pkce",
        })
    })

    const { refresh_token, customer_id, access_token} =  await response.json();

    return {code, usid, refresh_token, customer_id, access_token};
});

