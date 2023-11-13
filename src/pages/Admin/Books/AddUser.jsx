import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  message,
  notification,
} from "antd";
import { createUser } from "../../../services/api";
import { useState } from "react";

const AddUser = (Props) => {
  const { isModalOpen, setIsModalOpen } = Props;
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  const onFinish = ({ fullName, email, password, phone }) => {
    (async function () {
      setSubmit(true);
      try {
        const response = await createUser(fullName, email, password, phone);
        // console.log(`response:`, response);
        if (response.status === 200 || response.status === 201) {
          setIsModalOpen(false);
          message.success("Bạn đã đăng ký thành công!");
          form.resetFields();
          setSubmit(false);
        } else {
          notification.error({
            message: "Có lỗi xảy ra!",
            description: response.message,
          });
        }
      } catch (error) {
        console.log(`error:`, error);
        notification.error({
          message: "Có lỗi xảy ra!",
          description: error.response.data.message,
        });
      }
      setSubmit(false);
    })();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Thêm người dùng:"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      maskClosable={false}
      footer={[
        <Button key={1} size="large" onClick={() => setIsModalOpen(false)}>
          Hủy bỏ
        </Button>,
        <Button
          key={2}
          size="large"
          type="primary"
          onClick={() => {
            form.submit();
          }}
          loading={submit}
        >
          Xác nhận
        </Button>,
      ]}
      centered
    >
      {
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          action="#"
          form={form}
        >
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
                pattern:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message:
                  "Mật khẩu yêu cầu từ 8 đến 16 ký tự, có chữ cái in hoa và ký tự đặc biệt!",
              },
            ]}
          >
            <Input.Password
              style={{
                background: "transparent",
                borderColor: "rgb(209, 213, 219) ",
              }}
              placeholder="••••••••"
              className="flex border !bg-white border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 "
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
        </Form>
      }
    </Modal>
  );
};

export default AddUser;
