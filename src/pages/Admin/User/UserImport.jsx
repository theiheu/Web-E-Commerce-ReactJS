import { Button, Modal, Space, Table, Tag } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const columns = [
  {
    title: "Tên hiển thị",
    dataIndex: "fullName",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Emaill",
    dataIndex: "emaill",
    key: "emaill",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
];

const data = [
  //   {
  //     key: "fullName",
  //     fullName: "John Brown",
  //     emaill: 32,
  //     phone: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "emaill",
  //     fullName: "Jim Green",
  //     emaill: 42,
  //     phone: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "phone",
  //     fullName: "Joe Black",
  //     emaill: 32,
  //     phone: "Sydney No. 1 Lake Park",
  //   },
];

const dummyRequest = ({ file, onSuccess }) => {
  console.log(`file:`, file);

  onSuccess("ok");
};

const UserImport = (props) => {
  const { isOpenUserImport, setIsOpenUserImport } = props;

  const propsUserImport = {
    name: "file",
    multiple: false,
    maxCount: 1,
    customRequest: dummyRequest,
    accept:
      "text/plain, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      console.log(`info:`, info);

      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <Modal
      title="Import data user:"
      open={isOpenUserImport}
      onCancel={() => setIsOpenUserImport(false)}
      maskClosable={false}
      onOk={() => setIsOpenUserImport(false)}
      centered
      footer={[
        <Button key={1} size="large" onClick={() => setIsOpenUserImport(false)}>
          Hủy bỏ
        </Button>,
        <Button
          key={2}
          size="large"
          type="primary"
          //   loading={submit}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <Dragger {...propsUserImport} style={{ margin: "8px 0" }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Nhấp hoặc kéo tệp vào khu vực này để nhập
        </p>
        <p className="ant-upload-hint">
          Chỉ tải lên một lần một file. <br />
          Nghiêm cấm tải lên dữ liệu công ty hoặc các tập tin bị cấm khác.
        </p>
      </Dragger>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          y: 200,
        }}
      />
    </Modal>
  );
};

export default UserImport;
