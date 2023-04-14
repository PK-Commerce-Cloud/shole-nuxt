export const useUser = async () => {
    const auth = useCookie<{
        token: string,
        customer_id: string,
        authenticated: boolean,
        usid: string,
        type: 'guest' | 'credentials',
    }>("auth");
    


    if(!auth.value?.authenticated) {
        const { data } = await useAsyncData("authorize", () => $fetch("/api/guest"));

        auth.value = {
            authenticated: true,
            customer_id: data.value?.customer_id,
            token: data.value?.token,
            type: 'guest',
            usid: data.value?.usid
        }
       
    }

    return {
        authenticated: auth.value.authenticated,
        customer_id: auth.value.customer_id,
        token: auth.value.token,
        type: 'guest',
        usid: auth.value.usid
    }   

}