import { toast } from "react-toastify";
import styles from "./toast.module.css"
import "react-toastify/dist/ReactToastify.css"; // Importando o CSS do Toastify

// Função para exibir múltiplos toasts
export default function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    toast(message, {
        type: type,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: `${styles.toast} ${type == "success" ? styles.toast_sucess : type == "error" ? styles.toast_error : styles.toast_loading}`
    });
};
