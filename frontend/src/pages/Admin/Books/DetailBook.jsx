import { Badge, Descriptions, Divider, Modal, Upload } from "antd";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DetailBook = (Props) => {
  const { dataBook } = Props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const { thumbnail, slider } = dataBook;

  useEffect(() => {
    const mergeThumbnailAndSlider = [thumbnail, ...slider];
    const listImage = mergeThumbnailAndSlider.map((item) => {
      return {
        uid: uuidv4(),
        name: "image.png",
        status: "done",
        url: `${import.meta.env.VITE_SERVER_URL}images/book/${item}`,
      };
    });

    setFileList(listImage);
  }, [dataBook, thumbnail, slider]);

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
    <>
      <Descriptions
        title="Thông tin sách:"
        layout="horizontal"
        bordered
        column={1}
      >
        <Descriptions.Item label="ID" key={1}>
          {dataBook._id}
        </Descriptions.Item>
        <Descriptions.Item label="Tên sách" key={2}>
          {dataBook.mainText}
        </Descriptions.Item>
        <Descriptions.Item label="Thể loại" key={3}>
          <Badge status="processing" text={dataBook.category} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At:" key={4}>
          {moment(dataBook.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Descriptions.Item>
        <Descriptions.Item label="Tác giả" key={5}>
          {dataBook.author}
        </Descriptions.Item>
        <Descriptions.Item label="Giá tiền" key={6}>
          {`${dataBook.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng" key={6}>
          {dataBook.quantity}
        </Descriptions.Item>
        <Descriptions.Item label="Đã bán" key={7}>
          {dataBook.sold}
        </Descriptions.Item>
        <Descriptions.Item label="Update At:" key={8}>
          {dataBook.updatedAt}
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ fontWeight: "bold" }} orientation="left" plain>
        Ảnh sách
      </Divider>

      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        showUploadList={{ showRemoveIcon: false }}
      />

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
    </>
  );
};
export default DetailBook;
