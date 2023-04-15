import randomstring from "randomstring";
import crypto from "crypto-js";


const base64Url = (string) => {
    return string
      .toString(crypto.enc.Base64)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
};

export default defineEventHandler(async (event) => {    
    const codeVerifier = randomstring.generate(128);
    const codeChallenge = base64Url(crypto.SHA256(codeVerifier))  

    let url = `https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zybl_004/oauth2/authorize?client_id=0344f56d-3123-4cb8-ba82-be48f6baa789&redirect_uri=http://localhost:3000/api/callback&hint=guest&channel_id=SohleCrew&code_challenge=${codeChallenge}&response_type=code`;

    const response = await fetch(url, {
        redirect: "follow",
        headers: {
            verifier: codeVerifier
        }
    });

    const {usid, customer_id, access_token, refresh_token} = await response.json();    

    return {
        customer_id,
        usid,
        token: access_token, 
        refresh_token
    };
});
