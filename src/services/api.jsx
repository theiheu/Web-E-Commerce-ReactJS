import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
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

export const callLogin = (email, password) => {
  return axios({
    method: "POST",
    url: "/api/v1/auth/login",
    data: {
      username: email,
      password: password,
    },
  });
};

export const fetchAccount = () => {
  return axios({
    method: "GET",
    url: "/api/v1/auth/account",
  });
};

export const callLogout = () => {
  return axios({
    method: "POST",
    url: "/api/v1/auth/logout",
  });
};

export const fetchUserWithPaginate = (
  current = 1,
  pageSize = 2,
  filters,
  sorts
) => {
  return axios({
    method: "GET",
    url: `api/v1/user?current=${current}&pageSize=${pageSize}&${filters}&sort=${sorts}`,
  });
};

export const fetchAllUser = (filter) => {
  return axios({
    method: "GET",
    url: `api/v1/user${filter}`,
  });
};

export const createUser = (fullName, email, password, phone) => {
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

export const createListUser = (dataImport) => {
  return axios.post("api/v1/user/bulk-create", dataImport);
};

export const removeUser = (idUser) => {
  return axios({
    method: "DELETE",
    url: `api/v1/user/${idUser}`,
  });
};

export const updateUser = (id, fullName, phone) => {
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

export const fetchBooksWithPaginate = (
  current = 1,
  pageSize = 10,
  filters,
  sorts
) => {
  return axios({
    method: "GET",
    url: `api/v1/book?current=${current}&pageSize=${pageSize}&${filters}&sort=${sorts}`,
  });
};

export const fetchBooksWithPaginateHomePage = (
  current = 1,
  pageSize = 10,
  filters,
  sorts
) => {
  return axios({
    method: "GET",
    url: `api/v1/book?current=${current}&pageSize=${pageSize}&${filters}&sort=${sorts}`,
  });
};

export const fetchBooksCategory = () => {
  return axios({
    method: "GET",
    url: "api/v1/database/category",
  });
};

export const createBook = (dataBook) => {
  return axios({
    method: "POST",
    url: "api/v1/book",
    data: dataBook,
  });
};

export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

export const updateBook = (idBook, dataBook) => {
  return axios({
    method: "PUT",
    url: `api/v1/book/${idBook}`,
    data: dataBook,
  });
};

export const deleteImageBook = (dataBook) => {
  return axios({
    method: "POST",
    url: `api/v1/book/delete-image`,
    data: dataBook,
  });
};

export const deleteBook = (idBook) => {
  return axios({
    method: "DELETE",
    url: `api/v1/book/${idBook}`,
  });
};

export const getBookDetailById = (idBook) => {
  return axios({
    method: "GET",
    url: `api/v1/book/${idBook}`,
  });
};

export const createAnOrder = async (data) => {
  try {
    const response = await axios.post("api/v1/order", data);
    // Xử lý dữ liệu trả về nếu cần
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error creating order:", error);
    throw error;
  }
};

export const callOrderHistory = async () => {
  return axios({
    method: "GET",
    url: `api/v1/history`,
  });
};

export const fetchListOrderWithPaginate = async (
  current = 1,
  pageSize = 10
) => {
  return axios({
    method: "GET",
    url: `api/v1/order?current=${current}&pageSize=${pageSize}&sort=-createdAt`,
  });
};

export const uploadAvatarImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "POST",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};

export const updateInfo = async (data) => {
  try {
    const response = await axios.put("api/v1/user", data);
    // Xử lý dữ liệu trả về nếu cần
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error creating order:", error);
    throw error;
  }
};

export const changePassword = (data) => {
  return axios({
    method: "POST",
    url: "api/v1/user/change-password",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  });
};

export const callDashBoard = () => {
  return axios({
    method: "GET",
    url: "api/v1/database/dashboard",
  });
};

export const searchBook = (data) => {
  return axios({
    method: "GET",
    url: `api/v1/book?current=1&pageSize=10&mainText=${data}`,
  });
};
