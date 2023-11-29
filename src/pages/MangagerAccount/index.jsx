import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Tabs,
  Upload,
  message,
} from "antd";
import { useState } from "react";

const ManagerAccount = (Props) => {
  const { dataUser } = Props;
  console.log(`dataUser:`, dataUser);
  const [avatar, setAvatar] = useState(
    `${import.meta.env.VITE_SERVER_URL}images/avatar/${dataUser.avatar}`
  );
  const onChange = (key) => {
    console.log(key);
  };

  const propsUpload = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const items = [
    {
      key: "1",
      label: "Cập nhật thông tin",
      children: (
        <Row>
          <Col span={12} className="flex flex-col justify-start items-start">
            <div className="flex flex-col items-center gap-4">
              <Avatar size={200} src={avatar} icon={<UserOutlined />} />
              <Upload {...propsUpload}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </Col>
          <Col span={12}>
            <Form
              name="basic"
              layout="vertical"
              //   onFinish={onFinish}
              autoComplete="off"
              action="#"
              className="bg-white rounded-lg border-gray-900 max-w-md p-4 sm:p-2 lg:p-4 container text-left"
            >
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
                  className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                  placeholder="noname@gmail.com"
                />
              </Form.Item>
              <Form.Item
                label="Tên hiển thị"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ, số nhà!",
                  },
                ]}
              >
                <Input
                  placeholder="Nguyen Van A"
                  className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                />
              </Form.Item>
              <Form.Item
                className="text-left"
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input
                  placeholder="0345678910"
                  className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 "
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Đổi mật khẩu",
      children: (
        <Form
          name="basic"
          layout="vertical"
          //   onFinish={onFinish}
          autoComplete="off"
          action="#"
          className="bg-white rounded-lg border-gray-900 max-w-md p-4 sm:p-2 lg:p-4 container text-left"
        >
          <Form.Item label="Email" name="email">
            <Input
              className="flex border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
              placeholder="noname@gmail.com"
              disabled
              value={dataUser.email}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!!",
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
            label="Mật khẩu mới"
            name="newPassword"
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default ManagerAccount;
