import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useInput = (
  validateValue,
  errorMessage,
  isImage = false,
  initialValue = ""
) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [valueIsValid, setValueIsValid] = useState(true);

  useEffect(() => {
    setEnteredValue(initialValue);
  }, [initialValue]);

  const valueInputChangeHandler = (e) => {
    if (isImage) {
      if (e.target.files) {
        const isValid = validateValue(e.target.files[0]);
        setEnteredValue(e.target.files[0]);
        setValueIsValid(isValid);
        if (!isValid) {
          setValueIsValid(false);
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          e.target.value = null;
        }
      }
    } else {
      setEnteredValue(e.target.value);
      setValueIsValid(true);
    }
  };

  const valueInputBlurHandler = (e) => {
    const isValid = validateValue(enteredValue);
    setValueIsValid(isValid);

    if (!isValid) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const reset = () => {
    setEnteredValue("");
    setValueIsValid(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;
