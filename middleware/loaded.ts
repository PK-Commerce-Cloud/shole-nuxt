
const maxAge = 90 * 24 * 60 * 60;
export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie<{
    session: any
  }>("session", {
    maxAge: 1800,
    watch: true,
  });

  const refresh = useCookie<{
    refresh_token: string,
    usid: string
  }>("refresh_token", {
    maxAge
  });

  watch(cookie, () => {
    const { access_token, refresh_token, usid } = cookie.value?.session;
    if (access_token) {
      refresh.value = {
        refresh_token,
        usid,
      };

      if (cookie.value?.session.access_token) {
        return navigateTo('/')
      }
    }
  });

  if (cookie.value?.session.access_token) {
    return navigateTo('/')
  }

  cookie.value = {
    session: data.value,
  };
});
