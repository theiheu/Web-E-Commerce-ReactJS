import { Button, Modal, Table, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import * as xlsx from "xlsx";
import { useState } from "react";
import { createListUser } from "../../../services/api";
import TemplateFileImportData from "./data/Template file import data.xlsx?url";

const { Dragger } = Upload;

const columns = [
  {
    title: "Tên hiển thị",
    dataIndex: "fullName",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
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
  const [isDisable, setIsDisable] = useState(true);

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
        header: ["key", "fullName", "email", "phone", "password"],
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
        setIsDisable(false);
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
          disabled={dataImport < 1}
          onClick={async () => {
            try {
              const res = await createListUser(
                dataImport.map((item) => {
                  return {
                    key: `${item.key}`,
                    fullName: item.fullName,
                    password: `${item.password}`,
                    email: item.email,
                    phone: `${item.phone}`,
                  };
                })
              );
              if (res.status === 201) {
                notification.success({
                  message: `Nhập dữ liệu thành công!`,
                  description: `Success: ${res.data.data.countSuccess} -
                  Error:  ${res.data.data.countError}
                  `,
                });
              }
              console.log(`res:`, res);

              setIsDisable(true);
              onCancel();
            } catch (err) {
              console.log(`err:`, err);
            }
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
          Hỗ trợ nhập một thư mục dữ liệu, cho phép thư mục có định dạng đuôi
          .csv .xls .xlsx .or{" "}
          <a
            href={TemplateFileImportData}
            download
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Tải xuống file mẫu.
          </a>
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
