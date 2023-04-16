export const useUser = async () => {
    const session = useCookie('session');
    const refresh_token = useCookie('refresh');

    if(!session.value?.access_token && !refresh_token.value?.refresh_token) {
        refreshNuxtData("authorize");
        await useAsyncData("authorize", () => $fetch("/api/guest"));
    }


    if(refresh_token.value?.refresh_token) {
        refreshNuxtData("refresh");
        await useAsyncData("refresh", () => $fetch("/api/refresh", {
            headers: {
                refresh: refresh_token.value?.refresh_token
            }
        }));
    }

    return {
        session
    }
}