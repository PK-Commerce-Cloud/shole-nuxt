import { storeToRefs } from "pinia";
import { useSessionStore } from "~/store/session";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useSessionStore();

  const { session } = storeToRefs(store);
  if (session.value.access_token) {
    return navigateTo("/");
  }
});
