import {
  CloudUploadOutlined,
  ReloadOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
const ImportAndExportListUsers = (props) => {
  const { setFilters, setSofts } = props;
  const [spin, setSpin] = useState(false);
  return (
    <Space className="flex justify-end py-4">
      <Button type="primary" size={"large"}>
        <WalletOutlined />
        Export
      </Button>
      <Button size={"large"}>
        <CloudUploadOutlined />
        Import
      </Button>
      <Button type="dashed" size={"large"}>
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
          spin={spin}
          onClick={() => {
            setSpin(true);
            setFilters([]);
            setSofts("");
            setSpin(false);
          }}
        />
      </Button>
    </Space>
  );
};

export default ImportAndExportListUsers;
