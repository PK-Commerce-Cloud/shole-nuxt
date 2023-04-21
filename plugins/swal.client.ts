import Swal from 'sweetalert2'

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            swal: Swal
        }
    }
})