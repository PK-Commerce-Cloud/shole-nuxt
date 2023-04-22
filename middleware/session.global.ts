export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("session");
  if (from.name !== 'loading' && to.name !== "loading" && !cookie.value?.session.access_token) {
    return navigateTo("/loading");
  }
});
