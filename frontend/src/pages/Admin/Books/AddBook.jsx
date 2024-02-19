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
import { callUploadBookImg, createBook } from "../../../services/api";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { useSelector } from "react-redux";

const AddBook = (Props) => {
  const { setFilters, isModalOpen, setIsModalOpen } = Props;
  const { listCategory } = useSelector((state) => {
    return state.managerBooks;
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [form] = Form.useForm();

  const [fileListThumbnail, setFileListThumbnail] = useState([]);
  const [fileListSlider, setFileListSlider] = useState([]);

  const [submit, setSubmit] = useState(false);
  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);

  const onFinish = (values) => {
    if (dataThumbnail.length < 1 || dataSlider.length < 1) {
      message.error("Không được để trống ảnh!");
      return;
    }

    const dataInputAddBook = {
      thumbnail: dataThumbnail[0].name,
      slider: dataSlider.map((values) => values.name),
      mainText: values.mainText,
      author: values.author,
      price: values.price,
      sold: values.sold,
      quantity: values.quantity,
      category: values.category,
    };

    (async function () {
      setSubmit(true);
      try {
        const response = await createBook(dataInputAddBook);
        if (response.status === 200 || response.status === 201) {
          setIsModalOpen(false);
          message.success("Đã tạo sách thành công!");
          form.resetFields();
          setDataThumbnail([]);
          setDataSlider([]);
          setFileListThumbnail([]);
          setFileListSlider([]);
          setSubmit(false);
          setFilters([]);
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

  const handleChange = ({ fileList }, type) => {
    if (type === "thumbnail") {
      setFileListThumbnail(fileList);
    }
    if (type === "slider") {
      setFileListSlider(fileList);
    }
  };

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);

    if (res && res.data) {
      setDataThumbnail([
        {
          name: res.data.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
    onSuccess("ok");
  };

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);

    if (res && res.data) {
      setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          name: res.data.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  const handleRemoveFile = (file, type) => {
    if (type === "thumbnail") {
      setDataThumbnail([]);
    }
    if (type === "slider") {
      const newSlider = dataSlider.filter((x) => x.uid !== file.uid);
      setDataSlider(newSlider);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  // Preview image
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  return (
    <Modal
      title="Thêm sách:"
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        form.resetFields();
        setDataThumbnail([]);
        setDataSlider([]);
        setFileListThumbnail([]);
        setFileListSlider([]);
      }}
      maskClosable={false}
      width={"50vw"}
      footer={[
        <Divider key={"dividerModalAddBook"} />,
        <Button
          key={1}
          size="large"
          onClick={() => {
            setIsModalOpen(false);
            form.resetFields();
            setDataThumbnail([]);
            setDataSlider([]);
            setFileListThumbnail([]);
            setFileListSlider([]);
          }}
        >
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
                  formatter={(value) => {
                    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }}
                  placeholder="0"
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
                  },
                ]}
              >
                <Select
                  placeholder="Chọn thể loại "
                  options={listCategory}
                  showSearch
                >
                  {listCategory &&
                    listCategory?.map((item) => {
                      return <Select.Option key={item}>{item}</Select.Option>;
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name={"quantity"}
                label="Số lượng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng!",
                  },
                ]}
              >
                <InputNumber
                  name={"quantity"}
                  placeholder="0"
                  min={0}
                  className={"w-full"}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="sold"
                label="Đã bán"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng!",
                  },
                ]}
              >
                <InputNumber
                  name="sold"
                  placeholder="0"
                  min={0}
                  className={"w-full"}
                />
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
                  onPreview={handlePreview}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                  onChange={(fileList) => {
                    handleChange(fileList, "thumbnail");
                  }}
                  customRequest={handleUploadFileThumbnail}
                >
                  {"+ Upload"}
                </Upload>
              </ImgCrop>
              <span className="text-gray-500">
                Chỉ được phép đăng 1 ảnh duy nhất.
              </span>
            </Col>
            <Col span={12}>
              <Divider />
              Ảnh slider
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileListSlider}
                  onPreview={handlePreview}
                  beforeUpload={beforeUpload}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                  customRequest={handleUploadFileSlider}
                  onChange={(fileList) => {
                    handleChange(fileList, "slider");
                  }}
                >
                  {dataSlider.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
              <span className="text-gray-500">
                Được phép đăng tối đa 5 ảnh.
              </span>
            </Col>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Row>
        </Form>
      }
    </Modal>
  );
};

export default AddBook;
