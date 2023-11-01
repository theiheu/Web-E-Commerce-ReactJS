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
import { callRegister } from "../../services/api";

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const onFinish = async ({ fullName, email, password, phone }) => {
    setIsSubmit(true);
    try {
      const response = await callRegister(fullName, email, password, phone);
      console.log(`response:`, response);

      message.success("Bạn đã đăng ký thành công!");
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
        Đăng ký
      </h1>
      <Divider />
      <Form.Item
        label="Tên đầy đủ"
        name="fullName"
        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên của bạn!",
          },
        ]}
      >
        <Input
          className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          placeholder="Your Name"
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email của bạn!",
          },
          {
            pattern:
              /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            message: "Email nhập không chính xác!",
          },
        ]}
      >
        <Input
          className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-blue-500 w-full p-2.5"
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
            pattern:
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            message:
              "Mật khẩu yêu cầu từ 8 đến 16 ký tự, có chữ cái in hoa và ký tự đặc biệt!",
          },
        ]}
      >
        <Input.Password
          style={{
            // background: "transparent",
            borderColor: "rgb(209, 213, 219) ",
          }}
          placeholder="••••••••"
          className="flex border-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 "
        />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại của bạn!",
          },
          {
            pattern: new RegExp(/^[0-9]+$/),
            message: "Vui lòng nhập số!",
          },
        ]}
      >
        <Input
          placeholder="0345 678 910"
          className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
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
          Đăng ký
        </Button>
      </Form.Item>
      <Form.Item className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Tài khoản đã có sẵn?
        <NavLink to={"/login"} className="text-blue-700 hover:underline ml-1">
          Đăng nhập
        </NavLink>
      </Form.Item>
    </Form>
  );
};
export default RegisterPage;
