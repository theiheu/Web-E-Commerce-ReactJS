import { Button, Drawer, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { fetchUserWithPaginate, removeUser } from "../../../services/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdvancedSearchForm from "./AdvancedSearchForm";
import HeaderUsersTable from "./HeaderUsersTable";
import DetailUsers from "./DetailUsers";
import UserUpdate from "./UserUpdate";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/managerUsersSlice";

const UserTable = () => {
  // const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState([]);
  const [softs, setSofts] = useState("");

  const [openDetailUser, setOpenDetailUser] = useState(false);
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  const dispatch = useDispatch();
  const { dataListUser: data } = useSelector((state) => state?.managerUsers);

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
        dispatch(fetchUsers(result));
      } catch (error) {
        console.log(`error:`, error);
      }
    })();
  }, [dispatch, current, pageSize, total, filters, softs]);

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
      render: (text, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              console.log("Line: 81 - Here", record);
              setDataUser(record);
              setOpenDetailUser(true);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: "Tên hiển thị",
      width: 100,
      dataIndex: "fullName",
      key: "fullName",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updateAt",
      width: 150,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      width: 80,
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      width: "108px",
      render: (text) => (
        <Space>
          <Button>
            <EditOutlined
              style={{
                color: "#80ffd7",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={() => {
                setOpenModalUpdateUser(true);
                console.log("Line: 163 - Here", text);
                setDataUser(text);

                // const res = await removeUser(text._id);
                // console.log(`res:`, res);
                // if (res.status === 200) {
                //   setFilters([]);
                //   setSofts("");
                //   message.error(`Bạn đã xóa người dùng ${text.fullName}`);
                // }
              }}
            />
          </Button>

          <Button>
            <Popconfirm
              title="Xóa người dùng!"
              description="Bạn có chắc muốn xóa người dùng này không?"
              onConfirm={async () => {
                const res = await removeUser(text._id);
                console.log(`res:`, res);
                if (res.status === 200) {
                  setFilters([]);
                  setSofts("");
                  message.error(`Bạn đã xóa người dùng ${text.fullName}`);
                }
              }}
              onCancel={(e) => {
                console.log(e);
              }}
              okText="Vâng"
              cancelText="Không"
            >
              <DeleteOutlined
                style={{
                  color: "#FF8080",
                  marginLeft: "4px",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            </Popconfirm>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <AdvancedSearchForm setFilters={setFilters} />
      <HeaderUsersTable
        data={data}
        setFilters={setFilters}
        setSofts={setSofts}
      />
      <Table
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          padding: "4px",
          borderRadius: "4px",
        }}
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 10,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          position: ["bottomRight"],
          pageSizeOptions: ["10", "20", "30"],
          showTotal: (total, range) => {
            return (
              <>
                <Space size={6}>
                  <div>
                    {range[0]}-{range[1]}
                  </div>
                  trên {total} rows
                </Space>
              </>
            );
          },
        }}
        scroll={{
          x: 1000,
          y: 700,
          scrollToFirstRowOnChange: true,
        }}
        onChange={onChange}
      />
      <Drawer
        placement="right"
        onClose={() => {
          setOpenDetailUser(false);
        }}
        open={openDetailUser}
        width={"50%"}
      >
        <DetailUsers dataUser={dataUser} />
      </Drawer>
      <UserUpdate
        dataUser={dataUser}
        openModalUpdateUser={openModalUpdateUser}
        setFilters={setFilters}
        setOpenModalUpdateUser={setOpenModalUpdateUser}
      />
    </>
  );
};

export default UserTable;
