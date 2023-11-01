import axios from "../utils/axios-customize";

const callRegister = (fullName, email, password, phone) => {
  return axios({
    method: "POST",
    url: "/api/v1/user/register",
    data: {
      isAuthorization: false,
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
    },
  });
};
const callUser = (email, password) => {
  return axios({
    method: "POST",
    url: "/api/v1/auth/login",
    withCredentials: true,
    data: {
      username: email,
      password: password,
    },
  });
};
const fetchlUser = (token) => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/v1/auth/account",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { callRegister, callUser, fetchlUser };
