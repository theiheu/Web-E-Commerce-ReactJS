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
const fetchUserWithPaginate = (current = 1, pageSize = 2, filters, sorts) => {
  return axios({
    method: "GET",
    url: `api/v1/user?current=${current}&pageSize=${pageSize}&${filters}&sort=${sorts}`,
  });
};
const fetchAllUser = (filter) => {
  return axios({
    method: "GET",
    url: `api/v1/user${filter}`,
  });
};
const createUser = (fullName, email, password, phone) => {
  return axios({
    method: "POST",
    url: `api/v1/user`,
    data: {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
    },
  });
};
const createListUser = (dataImport) => {
  return axios.post("api/v1/user/bulk-create", dataImport);
};
const removeUser = (idUser) => {
  return axios({
    method: "DELETE",
    url: `api/v1/user/${idUser}`,
  });
};
const updateUser = (id, fullName, phone) => {
  return axios({
    method: "PUT",
    url: `api/v1/user`,
    data: {
      _id: id,
      fullName: fullName,
      phone: phone,
    },
  });
};

const fetchBooksWithPaginate = (current = 1, pageSize = 10, filters, sorts) => {
  return axios({
    method: "GET",
    url: `api/v1/book?current=${current}&pageSize=${pageSize}&${filters}&sort=${sorts}`,
  });
};

export {
  callRegister,
  callLogin,
  fetchAccount,
  callLogout,
  fetchUserWithPaginate,
  fetchAllUser,
  createUser,
  createListUser,
  removeUser,
  updateUser,
  fetchBooksWithPaginate,
};
