import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { fetchUserWithPaginate, updateUser } from "../../../services/api";

const UserUpdate = (Props) => {
  const { dataUser, setFilters, openModalUpdateUser, setOpenModalUpdateUser } =
    Props;
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    form.setFieldsValue(dataUser);
  }, [dataUser, form]);

  const onFinish = ({ _id, fullName, phone }) => {
    (async function () {
      setSubmit(true);
      try {
        const response = await updateUser(_id, fullName, phone);
        // console.log(`response:`, response);
        if (response.status === 200 || response.status === 201) {
          setOpenModalUpdateUser(false);
          message.success("Bạn đã cập nhật thành công!");
          form.resetFields();
          await fetchUserWithPaginate();
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
      title="Cập nhật người dùng:"
      forceRender
      open={openModalUpdateUser}
      onCancel={() => setOpenModalUpdateUser(false)}
      maskClosable={false}
      footer={[
        <Button
          key={1}
          size="large"
          onClick={() => {
            setOpenModalUpdateUser(false);
          }}
        >
          Hủy bỏ
        </Button>,
        <Button
          key={2}
          size="large"
          type="primary"
          onClick={() => {
            setFilters([]);
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
          <Form.Item hidden label="ID" name="_id">
            <Input
              className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              disabled
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="name@company.com"
              disabled
            />
          </Form.Item>

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

export default UserUpdate;
