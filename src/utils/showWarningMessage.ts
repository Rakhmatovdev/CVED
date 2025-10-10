import { toast } from "react-toastify";
import i18n from "@/i18n";

export function showWarningMessage(text = "") {
  toast.warn(`${i18n.t("statics.fakeData")} ${text}`, {
    toastId: "unique-warning-toast",
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  });
}
