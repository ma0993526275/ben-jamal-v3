import { ref } from 'vue';

const toasts = ref([]);
let toastId = 0;

export function useToast() {
    function showToast(message, actionLabel = null, onAction = null) {
        const id = ++toastId;
        const toast = {
            id,
            message,
            actionLabel,
            onAction
        };
        toasts.value.push(toast);

        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }

    function removeToast(id) {
        const index = toasts.value.findIndex(t => t.id === id);
        if (index > -1) {
            toasts.value.splice(index, 1);
        }
    }

    return {
        toasts,
        showToast,
        removeToast
    };
}
