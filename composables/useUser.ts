export const useUser = async () => {
    const auth = useCookie("auth", {
        default: () => ({ authenticated: false }),
        watch: true,
        maxAge: 1800
    });

    const refresh_token = useCookie("refresh", {
        default: () => ({ refresh_token: '' }),
        maxAge: 90*24*60*60*1000
    });
    


    if(!auth.value?.authenticated && !refresh_token.value?.refresh_token) {
        const { data } = await useAsyncData("authorize", () => $fetch("/api/guest"));

        auth.value = {
            authenticated: true,
            customer_id: data.value?.customer_id,
            token: data.value?.token,
            type: 'guest',
            usid: data.value?.usid,
            refresh_token: data.value.refresh_token
        }

        refresh_token.value = {
            refresh_token: data.value.refresh_token
        }
       
    } else {
        const { data: refresh } = await useAsyncData("refresh", () => $fetch("/api/refresh", {
            headers: {
                refresh: refresh_token.value.refresh_token
            }
        }));

        auth.value = {
            authenticated: true,
            customer_id: refresh.value?.customer_id,
            token: refresh.value?.token,
            type: 'guest',
            usid: refresh.value?.usid,
            refresh_token: refresh.value.refresh_token
        }


        console.log(refresh);

        refresh_token.value = {
            refresh_token: refresh.value.refresh_token
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