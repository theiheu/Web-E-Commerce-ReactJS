import { Button, Modal, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import * as xlsx from "xlsx";
import { useState } from "react";
import axios from "axios";
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

const UserImport = (props) => {
  const { isOpenUserImport, setIsOpenUserImport } = props;
  const [dataImport, setDataImport] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleReadFile = (file) => {
    // files is an array of file
    // if I just want the first file
    console.log(`file:`, file);

    let reader = new FileReader();

    reader.onload = function (e) {
      let data = new Uint8Array(e.target.result);
      let workbook = xlsx.read(data, { type: "array" });
      // find the name of your sheet in the workbook first
      let worksheet = Object.values(workbook.Sheets)[0];
      // convert to json format
      const jsonData = xlsx.utils.sheet_to_json(worksheet, {
        header: ["key", "fullName", "emaill", "phone"],
        range: 1,
      });
      setDataImport(() => jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const propsUserImport = {
    name: "file",
    multiple: false,
    maxCount: 1,
    fileList: fileList,
    customRequest: ({ file, onSuccess }) => {
      handleReadFile(file);
      onSuccess("ok");
    },
    accept:
      "text/plain, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      // console.log(`info:`, info);
      // readUploadFile(info.file);\
      setFileList(() => info.fileList);

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

  const onCancel = () => {
    setFileList([]);
    setDataImport([]);
    setIsOpenUserImport(false);
  };

  return (
    <Modal
      title="Import data user:"
      open={isOpenUserImport}
      onCancel={onCancel}
      onOk={() => setIsOpenUserImport(false)}
      centered
      footer={[
        <Button key={1} size="large" onClick={onCancel}>
          Hủy bỏ
        </Button>,
        <Button
          key={2}
          size="large"
          type="primary"
          //   loading={submit}
          onClick={() => {
            return axios
              .post("api/v1/user/bulk-create", dataImport)
              .then((response) => {
                console.log("Response:", response.data);
                // Xử lý dữ liệu phản hồi nếu cần
              })
              .catch((error) => {
                console.error("Error:", error);
                // Xử lý lỗi nếu có
              });
          }}
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
        dataSource={dataImport}
        scroll={{
          y: 200,
        }}
      />
    </Modal>
  );
};

export default UserImport;
