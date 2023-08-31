import {  toast } from 'react-toastify';

const toastrConfig: {} = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
};


export const successMessage = (message: string, config: {} = toastrConfig): void=> {
    toast.success(message, { ...toastrConfig, ...config });
}

export const errorMessage = (message: string, config: {} = toastrConfig): void => {
    toast.error(message, {...toastrConfig, ...config} );
}
export const warningMessage = (message: string, config: {} = toastrConfig): void => {
    toast.warning(message, { ...toastrConfig, ...config });
}
export const infoMessage = (message: string, config: {} = toastrConfig): void => {
    toast.warning(message, { ...toastrConfig, ...config });
}

    
