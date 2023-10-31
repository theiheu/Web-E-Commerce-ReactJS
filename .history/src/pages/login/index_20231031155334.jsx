import { Button, Checkbox, Divider, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const RegisterPage = () => (
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
      Sign In
    </h1>
    <Divider />
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: "Please input your email!",
        },
        {
          pattern:
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
          message: "Email nhập không chính xác!",
        },
      ]}
    >
      <Input
        className="flex bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
        placeholder="name@company.com"
      />
    </Form.Item>
    <Form.Item
      label="Password"
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
          background: "rgb(249 250 251)",
          borderColor: "rgb(209 213 219) ",
        }}
        placeholder="••••••••"
        className="flex bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 "
      />
    </Form.Item>
    <Form.Item
      style={{ display: "inline-block" }}
      name="remember"
      valuePropName="checked"
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Form.Item>
      <Button
        className="w-full min-h-[50px] text-white hover:!text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        htmlType="submit"
      >
        Sign in
      </Button>
    </Form.Item>
    <Form.Item className="text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered?
      <NavLink className="text-blue-700 hover:underline dark:text-blue-500 ml-2">
        Create account
      </NavLink>
    </Form.Item>
  </Form>
);
export default RegisterPage;
