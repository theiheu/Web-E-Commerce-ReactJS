import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callUser } from "../../services/api";

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const onFinish = async ({ email, password }) => {
    setIsSubmit(true);
    try {
      const response = await callUser(email, password);
      console.log(`response:`, response);
      console.log(`response:`, response?.data?.data?.access_token);
      localStorage.setItem("acces_token", response?.data?.data?.access_token);

      message.success("Bạn đã đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.log(`error:`, error);
      notification.error({
        message: "Có lỗi xảy ra!",
        description: error.response.data.message,
      });
    }
    setIsSubmit(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      action="#"
      className="bg-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-2 rounded-lg  border-gray-900 max-w-md p-4 sm:p-6 lg:p-8 container mt-[50px] md:mt-[100px]"
    >
      <h1 className="text-xl text-center font-medium text-gray-900 dark:text-dark">
        Đăng nhập
      </h1>
      <Divider />
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email!",
          },
          {
            pattern:
              /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            message: "Email nhập không chính xác!",
          },
        ]}
      >
        <Input
          className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          placeholder="name@company.com"
        />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!!",
          },
          {
            // pattern:
            //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            message:
              "Mật khẩu yêu cầu từ 8 đến 16 ký tự, có chữ cái in hoa và ký tự đặc biệt!",
          },
        ]}
      >
        <Input.Password
          style={{
            background: "transparent",
            borderColor: "rgb(209 213 219) ",
          }}
          placeholder="••••••••"
          className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 "
        />
      </Form.Item>
      <Form.Item
        style={{ display: "inline-block" }}
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Lưu thông tin</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          className="w-full min-h-[50px] text-white hover:!text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          htmlType="submit"
          loading={isSubmit}
        >
          Đăng nhập
        </Button>
      </Form.Item>
      <Form.Item className="text-sm font-medium text-gray-700">
        <span>Chưa có tài khoản?</span>
        <NavLink
          to={"/register"}
          className="text-blue-700 hover:underline dark:text-blue-500 ml-1"
        >
          Tạo tài khoản
        </NavLink>
      </Form.Item>
    </Form>
  );
};
export default RegisterPage;
