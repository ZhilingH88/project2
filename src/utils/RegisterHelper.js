import validator from "validator";

const isEmailValid = (email) => {
  const isEmail = validator.isEmail(email);
  return isEmail;
};

const isPasswordValid = (password) => {
  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const isPassword = password_regex.test(password);
  return isPassword;
};

const isEmpty = (value) => {
  return validator.isEmpty(value);
};

export { isEmailValid, isPasswordValid, isEmpty };
