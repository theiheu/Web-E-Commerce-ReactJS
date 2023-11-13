import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import { createUser, fetchBooksCategory } from "../../../services/api";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import ImgCrop from "antd-img-crop";

const AddBook = (Props) => {
  const { listCateGory, isModalOpen, setIsModalOpen } = Props;
  console.log(`listCateGory:`, listCateGory);

  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);

  //   {
  //     "thumbnail": "abc",
  //     "slider": ["def"],
  //     "mainText": "asdfasfasfd",
  //     "author": "asfdafdasdf",
  //     "price": 666666,
  //     "sold": 0,
  //     "quantity": 1000,
  //     "category": "Arts"
  // }

  const onFinish = (values) => {
    console.log(`values:`, values);

    // (async function () {
    //   setSubmit(true);
    //   try {
    //     const response = await createUser(fullName, email, password, phone);
    //     // console.log(`response:`, response);
    //     if (response.status === 200 || response.status === 201) {
    //       setIsModalOpen(false);
    //       message.success("Bạn đã đăng ký thành công!");
    //       form.resetFields();
    //       setSubmit(false);
    //     } else {
    //       notification.error({
    //         message: "Có lỗi xảy ra!",
    //         description: response.message,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(`error:`, error);
    //     notification.error({
    //       message: "Có lỗi xảy ra!",
    //       description: error.response.data.message,
    //     });
    //   }
    //   setSubmit(false);
    // })();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [fileListThumbnail, setFileListThumbnail] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [fileListSlider, setFileListSlider] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChangeThumbnail = ({ fileList: newFileListThumbnail }) => {
    console.log(`newFileListThumbnail:`, newFileListThumbnail);

    setFileListThumbnail(newFileListThumbnail);
  };
  const onChangeSlider = ({ fileList: newFileListSlider }) => {
    console.log(`newFileListSlider:`, newFileListSlider);

    setFileListSlider(newFileListSlider);
  };

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

  return (
    <Modal
      title="Thêm sách:"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      maskClosable={false}
      className="!w-[900px]"
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
          initialValues={{
            price: 0,
            quatity: 0,
            sold: 0,
          }}
          form={form}
        >
          <Divider />
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label="Tên Sách:"
                name="mainText"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên sách",
                  },
                ]}
              >
                <Input
                  className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                  placeholder="Vui lòng nhập tên sách"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tác giả"
                name="author"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên tác giả!",
                  },
                ]}
              >
                <Input
                  className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                  placeholder="Vui lòng nhập tên tác giả"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá tiền!!",
                  },
                ]}
              >
                <InputNumber
                  addonAfter={"VND"}
                  name="price"
                  style={{
                    width: "100%",
                  }}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="category"
                label="Thể loại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thể loại sách!",
                    type: "array",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Please ">
                  {listCateGory &&
                    listCateGory?.map((item) => {
                      return <Select.Option key={item}>{item}</Select.Option>;
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name={"quatity"}
                label="Số lượng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng!",
                  },
                ]}
              >
                <InputNumber name={"quatity"} min={0} className={"w-full"} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="sold"
                label="Đã bán"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber name="sold" min={0} className={"w-full"} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Divider />
              Ảnh thumbnail
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileListThumbnail}
                  onChange={onChangeThumbnail}
                  // onPreview={onPreview}
                  maxCount={1}
                >
                  {"+ Upload"}
                </Upload>
              </ImgCrop>
            </Col>
            <Col span={12}>
              <Divider />
              Ảnh slider
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileListSlider}
                  onChange={onChangeSlider}
                  // onPreview={onPreview}
                >
                  {fileListSlider.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Col>
          </Row>
        </Form>
      }
    </Modal>
  );
};

export default AddBook;
