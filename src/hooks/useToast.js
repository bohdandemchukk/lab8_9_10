import {useRef} from "react";
import {toast} from "react-toastify";


export default function useToast() {

  const errorToastId = useRef(null);
  const successToastId = useRef(null);

  function showErrorToast(message) {
    if (toast.isActive(errorToastId.current)) {
      toast.update(errorToastId.current, {
        render: message,
        type: toast.TYPE.ERROR,
        autoClose: 3000,
      });
    } else {
      errorToastId.current = toast.error(message, {
        autoClose: 3000,
      });
    }
  }

  function showSuccessToast(message) {
    if (toast.isActive(successToastId.current)) {
      toast.update(successToastId.current, {
        render: message,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
      });
    } else {
      successToastId.current = toast.success(message, {
        autoClose: 3000,
      });
    }
  };
  
  return {showErrorToast, showSuccessToast};
}