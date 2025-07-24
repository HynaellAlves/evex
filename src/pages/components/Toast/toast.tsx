import { toast } from 'react-toastify';

import ToastComponentSucess from './toast_sucess'
import ToastComponentError from './toast_error'
import ToastComponentLoading from './toast_loading'


export const toast_sucess = (message: string) => (
    toast(<ToastComponentSucess message={message} />, {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
    })
);

export const toast_error = (message: string) => (
    toast(<ToastComponentError message={message} />, {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
    })
)

export const toast_loading = (message: string) => (
    toast(<ToastComponentLoading message={message} />, {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
    })
)
