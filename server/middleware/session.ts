import crypto from "crypto-js";
const maxAge = 90 * 24 * 60 * 60;

function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const base64Url = (string) => {
  return string
    .toString(crypto.enc.Base64)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  if (cookies.session) {
    return;
  } else if (cookies.refresh_token) {
    const response = await fetch(
      "https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zybl_004/oauth2/token",
      {
        method: "POST",
        headers: {
          contentType: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: "0344f56d-3123-4cb8-ba82-be48f6baa789",
          grant_type: "refresh_token",
          refresh_token: cookies.refresh_token,
        }),
      }
    );

    const json = await response.json();
    
    setCookie(event, "session", JSON.stringify({session: json}), {
      maxAge: 1800,
    });
    setCookie(event, "refresh_token", json.refresh_token, {
      maxAge,
      path: "/",
      sameSite: "lax",
    });
  } else {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = base64Url(crypto.SHA256(codeVerifier));

    const res = await fetch(
      `https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zybl_004/oauth2/authorize?client_id=0344f56d-3123-4cb8-ba82-be48f6baa789&redirect_uri=http://localhost:3000/api/callback&hint=guest&channel_id=SohleCrew&code_challenge=${codeChallenge}&response_type=code`,
      {
        headers: {
          verifier: codeVerifier,
        },
        redirect: "manual",
      }
    );

    var url = new URL(res.headers.get("Location") || "");
    const urlParams = new URLSearchParams(url.search);

    urlParams.append("grant_type", "authorization_code_pkce");
    urlParams.append("client_id", "0344f56d-3123-4cb8-ba82-be48f6baa789");
    urlParams.append("code_verifier", codeVerifier);
    urlParams.append("redirect_uri", "http://localhost:3000/api/callback");
    urlParams.append("channel_id", "SohleCrew");

    var r = await fetch(
      "https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zybl_004/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlParams,
      }
    );
    const json = await r.json();

    setCookie(event, "session", JSON.stringify({session: json}), {
      maxAge: 1800,
    });
    setCookie(event, "refresh_token", json.refresh_token, {
      maxAge,
      path: "/",
      sameSite: "lax",
    });
  }
});
