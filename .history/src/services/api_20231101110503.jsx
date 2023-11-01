import instance from "../utils/axios-customize";

const callRegister = (fullName, email, password, phone) => {
  instance({
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

export default callRegister;
