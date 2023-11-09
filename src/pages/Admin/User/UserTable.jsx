import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchUserWithPaginate } from "../../../services/api";
import { DeleteOutlined } from "@ant-design/icons";
import AdvancedSearchForm from "./AdvancedSearchForm";
import ImportAndExportListUsersj from "./ImportAndExportListUsersj";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState([]);
  const [softs, setSofts] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetchUserWithPaginate(
          current,
          pageSize,
          filters.join(""),
          softs
        );
        const { meta, result } = res.data.data;
        setCurrent(() => meta.current);
        setPageSize(() => meta.pageSize);
        setTotal(() => meta.total);

        setData(() =>
          result.map((item) => {
            return {
              _id: item._id,
              fullName: item.fullName,
              email: item.email,
              phone: item.phone,
              key: item._id,
            };
          })
        );
      } catch (error) {
        console.log(`error:`, error);
      }
    })();
  }, [current, pageSize, filters, softs]);

  const onChange = async (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    console.log(`sorter:`, sorter);

    if (pagination && pagination.current !== current) {
      setCurrent(() => pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(() => pagination.pageSize);
    }

    if (sorter.order === "ascend") {
      setSofts(sorter.field);
    }

    if (sorter.order === "descend") {
      setSofts(-sorter.field);
    }
  };

  const columns = [
    {
      title: "ID",
      width: 100,
      dataIndex: "_id",
      key: "updatedAt",
    },
    {
      title: "Tên hiển thị",
      width: 100,
      dataIndex: "fullName",
      key: "updatedAt",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "updatedAt",
      width: 150,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "updatedAt",
      width: 150,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },

    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      width: 50,
      render: () => (
        <DeleteOutlined
          style={{ color: "#FF8080", cursor: "pointer", fontSize: "20px" }}
          onClick={() => console.log("Line: 52 - Here")}
        />
      ),
    },
  ];

  return (
    <>
      <AdvancedSearchForm setFilters={setFilters} />
      {/*
      <Space
        style={{ background: "#f5f5f5", borderRadius: "8px" }}
        direction="vertical"
      > */}
      <ImportAndExportListUsersj setFilters={setFilters} setSofts={setSofts} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 10,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          position: ["bottomRight"],
          pageSizeOptions: ["10", "20", "30"],
        }}
        scroll={{
          x: 1000,
          y: 400,
          scrollToFirstRowOnChange: true,
        }}
        onChange={onChange}
      />
      {/* </Space> */}
    </>
  );
};

export default UserTable;
