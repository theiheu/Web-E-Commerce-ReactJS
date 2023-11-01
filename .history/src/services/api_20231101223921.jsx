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
const fetchlUser = (email, password) => {
  return axios({
    method: "POST",
    url: "http://localhost:8080/api/v1/auth/account",
    data: {
      username: email,
      password: password,
    },
  });
};

export { callRegister, callUser, fetchlUser };
