import Alert from "sweetalert2";

export const AlertSuccess = ({
  title,
  text,
  showConfirmButton = false,
  html,
}) =>
  Alert.fire({
    position: "center",
    icon: "success",
    text: text,
    title: title,
    showConfirmButton: showConfirmButton ? true : false,
    timer: showConfirmButton ? false : 1000,
    html: html,
  });

export const AlertError = ({ title, text, showConfirmButton = false }) =>
  Alert.fire({
    position: "center",
    icon: "error",
    text: text,
    title: title,
    showConfirmButton: showConfirmButton ? true : false,
    timer: showConfirmButton ? false : 1000,
  });

export const AlertConfirm = ({
  title,
  text,
  input = `checkbox`,
  inputPlaceholder = `Saya telah membaca dan menyetujui Syarat & Ketentuan yang berlaku untuk melanjutkan proses`,
}) =>
  Alert.fire({
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
    input: input,
    inputPlaceholder: inputPlaceholder,
  });

export const AlertQuestion = ({ text, title }) =>
  Alert.fire({
    icon: "warning",
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  });
