export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("session");

  if (from.path !== '/loading' && to.path !== "/loading" && !cookie.value?.session.access_token) {
    return navigateTo("/loading");
  }
});
