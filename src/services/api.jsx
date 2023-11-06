import axios from "../utils/axios-customize";

const callRegister = (fullName, email, password, phone) => {
  return axios({
    method: "POST",
    url: "/api/v1/user/register",
    data: {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
    },
  });
};
const callLogin = (email, password) => {
  return axios({
    method: "POST",
    url: "/api/v1/auth/login",
    data: {
      username: email,
      password: password,
    },
  });
};
const fetchAccount = () => {
  return axios({
    method: "GET",
    url: "/api/v1/auth/account",
  });
};
const callLogout = () => {
  return axios({
    method: "POST",
    url: "/api/v1/auth/logout",
  });
};

export { callRegister, callLogin, fetchAccount, callLogout };
