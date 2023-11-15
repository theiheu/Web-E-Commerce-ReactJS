import { Button, Drawer, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { deleteBook, fetchBooksWithPaginate } from "../../../services/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import HeaderUsersTable from "./HeaderUsersTable";
import UserUpdate from "./UserUpdate";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../../redux/managerBooksSlice";
import AdvancedSearchFormBook from "../User/AdvancedSearchFormBook";
import DetailBook from "./DetailBook";

const BooksTable = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState([]);
  const [softs, setSofts] = useState("-updatedAt");

  const [openDetailBook, setOpenDetailBook] = useState(false);
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
  const [dataBook, setDataBook] = useState([]);

  const dispatch = useDispatch();
  const { dataListBooks: data } = useSelector((state) => state?.managerBooks);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetchBooksWithPaginate(
          current,
          pageSize,
          filters.join(""),
          softs
        );
        console.log(`res:`, res);

        const { meta, result } = res.data.data;

        setCurrent(() => meta.current);
        setPageSize(() => meta.pageSize);
        setTotal(() => meta.total);
        dispatch(fetchBooks(result));
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
              setDataBook(record);
              setOpenDetailBook(true);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: "Ảnh sách",
      width: "100px",
      dataIndex: "thumbnail",
      key: "thumbnail",
    },
    {
      title: "Tên sách",
      width: 200,
      dataIndex: "mainText",
      key: "mainText",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      width: 150,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      width: 150,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      width: 100,
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
      title: "Thao tác",
      key: "action",
      fixed: "right",
      width: "88px",
      render: (text) => (
        <Space>
          <Button
            onClick={() => {
              setOpenModalUpdateUser(true);
              setDataBook(text);
            }}
            size="small"
          >
            <EditOutlined
              style={{
                color: "#80ffd7",
                cursor: "pointer",
                fontSize: "20px",
              }}
            />
          </Button>

          <Button size="small">
            <Popconfirm
              title="Xóa người dùng!"
              description="Bạn có chắc muốn xóa người dùng này không?"
              onConfirm={async () => {
                const res = await deleteBook(text._id);
                console.log(`res:`, res);
                if (res.status === 200) {
                  setFilters([]);
                  message.error(`Bạn đã xóa cuốn sách ${text.mainText}`);
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
      <AdvancedSearchFormBook setFilters={setFilters} />
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
          setOpenDetailBook(false);
        }}
        open={openDetailBook}
        width={"50%"}
      >
        <DetailBook dataBook={dataBook} />
      </Drawer>
      <UserUpdate
        dataBook={dataBook}
        openModalUpdateUser={openModalUpdateUser}
        setFilters={setFilters}
        setOpenModalUpdateUser={setOpenModalUpdateUser}
      />
    </>
  );
};

export default BooksTable;
