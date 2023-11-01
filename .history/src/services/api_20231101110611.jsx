import instance from "../utils/axios-customize";

const callRegister = async (fullName, email, password, phone) => {
  await instance({
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
