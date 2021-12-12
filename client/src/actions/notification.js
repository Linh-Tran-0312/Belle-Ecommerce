import { ACTION } from "../constants";
export const enqueueSnackbar = (message, status) => {
    return {
        type: ACTION.ENQUEUE_SNACKBAR,
        notification: {
            key: new Date().getTime() + Math.random(),
            message: message,
            options: {
                key: new Date().getTime() + Math.random(),
                variant: status,               
            },
        },
    };
};

export const closeSnackbar = key => ({
    type: ACTION.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: ACTION.REMOVE_SNACKBAR,
    key,
});
