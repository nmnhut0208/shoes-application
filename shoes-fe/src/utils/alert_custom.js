import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./alert.css";

export function CustomAlert(message) {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000, // 5s
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "custom-toast",
  });
}
