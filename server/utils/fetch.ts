import { H3Event } from "h3";
import _ from "lodash";

export const _fetch = (
  event: H3Event,
  url: RequestInfo | URL,
  opts: RequestInit | undefined
) => {
  const cookie = getCookie(event, "session");

  const { session } = JSON.parse(cookie || "{}");

  if (!session && !session?.access_token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized ' })
  }

  const options = _.merge(
    {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    },
    opts
  );

  return fetch(url, options);
};
