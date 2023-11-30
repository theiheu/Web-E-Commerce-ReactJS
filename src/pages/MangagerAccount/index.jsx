import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Tabs,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import {
  changePassword,
  fetchAccount,
  updateInfo,
  uploadAvatarImg,
} from "../../services/api";
import {
  doGetAccountAction,
  doUpdateInfoAction,
} from "../../redux/accountSlice";
import { useDispatch } from "react-redux";

const ManagerAccount = (Props) => {
  const { dataUser, openModal, setOpenModal } = Props;
  const [form] = Form.useForm();
  const [tabs, setTabs] = useState("info");

  const [avatar, setAvatar] = useState(
    `${import.meta.env.VITE_SERVER_URL}images/avatar/${dataUser.avatar}`
  );
  const [nameAvatar, setNameAvatar] = useState(dataUser.avatar);

  const handleUploadInfo = async ({ file, onSuccess }) => {
    const res = await uploadAvatarImg(file);
    console.log(`res:`, res);
    if (res && res.status == 201) {
      setAvatar(
        `${import.meta.env.VITE_SERVER_URL}images/avatar/${
          res?.data?.data?.fileUploaded
        }`
      );
      setNameAvatar(res?.data?.data?.fileUploaded);

      onSuccess();
    }
  };

  const propsUpload = {
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: handleUploadInfo,
    maxCount: 1,
  };

  const onChange = (key) => {
    setTabs(key);
  };

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(`values:`, values);

    if (tabs === "info") {
      try {
        const res = await updateInfo({
          fullName: values.fullName,
          phone: values.phone,
          avatar: nameAvatar,
          _id: dataUser.id,
        });
        if (res && res.statusCode == 200) {
          localStorage.removeItem("access_token");
          dispatch(
            doUpdateInfoAction(nameAvatar, values.fullName, values.phone)
          );
          message.success("Bạn đã cập nhật thành công");
        }
      } catch (error) {
        console.error("Error updating info:", error);
        // Handle error as needed
      }
    }
    if (tabs === "password") {
      try {
        const res = await changePassword({
          email: dataUser.email,
          oldpass: `${values.currentPassword}`,
          newpass: `${values.newPassword}`,
        });
        console.log(`res:`, res);

        if (res && res.status == 201) {
          message.success("Bạn đã đổi mật khẩu thành công");
        } else {
          message.error(res.message);
        }
      } catch (error) {
        console.error("Error updating info:", error);
        // Handle error as needed
      }
    }
  };

  const handleCancel = () => {
    setAvatar(
      `${import.meta.env.VITE_SERVER_URL}images/avatar/${dataUser.avatar}`
    );
    setOpenModal(false);
  };

  const items = [
    {
      key: "info",
      label: "Cập nhật thông tin",
      children: (
        <Row className="flex justify-center items-center">
          <Col span={12} className="flex flex-col justify-start items-start">
            <div className="flex flex-col items-center gap-4">
              <Avatar size={200} src={avatar} icon={<UserOutlined />} />
              <Upload {...propsUpload}>
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
              </Upload>
            </div>
          </Col>
          <Col span={12}>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              autoComplete="off"
              action="#"
              className="bg-white rounded-lg border-gray-900 max-w-md p-4 sm:p-2 lg:p-4 container text-left"
            >
              <Form.Item
                label="Email"
                name="email"
                initialValue={dataUser.email}
              >
                <Input
                  className="flex border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                  disabled
                />
              </Form.Item>
              <Form.Item
                label="Tên hiển thị"
                name="fullName"
                initialValue={dataUser.fullName}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên của bạn!",
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
                initialValue={dataUser.phone}
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
      key: "password",
      label: "Đổi mật khẩu",
      children: (
        <Form
          name="basic"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          action="#"
          className="bg-white rounded-lg border-gray-900 max-w-md p-4 sm:p-2 lg:p-4 container text-left"
        >
          <Form.Item label="Email" name="email" initialValue={dataUser.email}>
            <Input
              className="flex border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
              disabled
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
        </Form>
      ),
    },
  ];

  return (
    <Modal
      open={openModal}
      // open={true}
      width="50vw"
      title="Quản lý tài khoản"
      onCancel={handleCancel}
      footer={
        <>
          <Button onClick={handleCancel}>Hủy bỏ</Button>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
              setOpenModal(false);
            }}
          >
            Áp dụng
          </Button>
        </>
      }
    >
      <Tabs defaultActiveKey="info" items={items} onChange={onChange} />
    </Modal>
  );
};

export default ManagerAccount;
