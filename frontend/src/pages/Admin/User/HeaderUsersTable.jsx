import {
  CloudUploadOutlined,
  ReloadOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
import AddUser from "./AddUser";
import UserImport from "./UserImport";
import * as XLSX from "xlsx";

const HeaderUsersTable = (Props) => {
  const { data, setFilters, setSofts } = Props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenUserImport, setIsOpenUserImport] = useState(false);

  return (
    <>
      <Space className="flex justify-end py-4">
        <Button
          type="primary"
          size={"large"}
          onClick={() => {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
            //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
            XLSX.writeFile(workbook, "DataSheet.csv");
          }}
        >
          <WalletOutlined />
          Export
        </Button>
        <Button
          size={"large"}
          onClick={() => {
            setIsOpenUserImport(true);
          }}
        >
          <CloudUploadOutlined />
          Import
        </Button>
        <Button
          type="dashed"
          size={"large"}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Thêm mới
        </Button>

        <Button
          size={"large"}
          style={{
            border: "none",
            padding: "4px",
          }}
        >
          <ReloadOutlined
            style={{ fontSize: "20px", margin: "0 4px", cursor: "pointer" }}
            onClick={() => {
              setFilters([]);
              setSofts("");
            }}
          />
        </Button>
      </Space>
      <AddUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <UserImport
        isOpenUserImport={isOpenUserImport}
        setIsOpenUserImport={setIsOpenUserImport}
      />
    </>
  );
};

export default HeaderUsersTable;
