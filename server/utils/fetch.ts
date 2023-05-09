import { H3Event } from "h3";
import _ from "lodash";

export const _fetch = (
  event: H3Event,
  url: RequestInfo | URL,
  opts: RequestInit | undefined
) => {
  const cookie = getCookie(event, "session");

  const i18n_redirected = getCookie(event, "i18n_redirected");

  const { session } = JSON.parse(cookie || "{}");

  if (!session && !session?.access_token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized ' })
  }

  const parseUrl = new URL(url.toString());

  parseUrl.searchParams.append("locale", i18n_redirected || "en");

  const options = _.merge(
    {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    },
    opts
  );

  return fetch(parseUrl, options);
};
