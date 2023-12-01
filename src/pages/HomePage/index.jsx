import { Layout, theme, Tabs, Pagination, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./homePage.scss";
import { useEffect, useState } from "react";
import {
  fetchBooksCategory,
  fetchBooksWithPaginateHomePage,
} from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchListCategory } from "../../redux/managerBooksSlice";
import ListBooks from "../../components/ListBooks";
import Sidebar from "../../components/Sidebar";
const { Content } = Layout;

const HomePage = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState();

  const [filters, setFilters] = useState([]);
  const [softs, setSofts] = useState("-sold");

  const dispatch = useDispatch();
  const { dataListBooks } = useSelector((state) => state?.managerBooks);
  // const [dataBook, setDataBook] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const resListCategory = await fetchBooksCategory();

        if (resListCategory && resListCategory.data) {
          const dataListCategory = resListCategory.data.data.map((value) => {
            return {
              value,
              label: value,
            };
          });

          dispatch(fetchListCategory(dataListCategory));

          const res = await fetchBooksWithPaginateHomePage(
            current,
            pageSize,
            filters,
            softs
          );
          const { meta, result } = res.data.data;

          setCurrent(() => meta.current);
          setPageSize(() => meta.pageSize);
          setTotal(() => meta.total);

          dispatch(fetchBooks(result));
        }
      } catch (error) {
        console.log(`error:`, error);
      }
    })();
  }, [dispatch, current, pageSize, total, filters, softs]);

  const onChangePagination = async (current, pageSize) => {
    setCurrent(() => current);
    setPageSize(() => pageSize);
  };

  const onChangeProductTab = (key) => {
    switch (key) {
      case "popular":
        setSofts("-sold");
        break;
      case "productsNew":
        setSofts("-updatedAt");
        break;
      case "minToMax":
        setSofts("price");
        break;
      case "maxToMin":
        setSofts("-price");
        break;
      default:
        break;
    }
  };

  const itemsProductTab = [
    {
      key: "popular",
      label: "Phổ biến",
      children: <ListBooks dataListBooks={dataListBooks} />,
    },
    {
      key: "productsNew",
      label: "Hàng Mới",
      children: <ListBooks dataListBooks={dataListBooks} />,
    },
    {
      key: "minToMax",
      label: "Giá Thấp Đến Cao",
      children: <ListBooks dataListBooks={dataListBooks} />,
    },
    {
      key: "maxToMin",
      label: "Giá Cao Đến Thấp",
      children: <ListBooks dataListBooks={dataListBooks} />,
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        height: "89vh",
      }}
    >
      <Sidebar />

      <Layout
        style={{
          padding: "24px 24px 24px",
        }}
      >
        <Breadcrumb
          className="mb-2"
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              title: "Trang chủ",
            },
          ]}
        />
        <Content
          className="flex flex-col"
          style={{
            padding: "0px 24px 0px 24px",
            margin: 0,
            borderRadius: "8px",
            Height: "100vh",
            background: colorBgContainer,
          }}
        >
          <Tabs
            className="flex-1 mb-5"
            defaultActiveKey="1"
            items={itemsProductTab}
            onChange={onChangeProductTab}
          />
          <Pagination
            className="flex justify-end items-center border-2 p-5"
            total={total}
            showTotal={(total, range) => {
              return `${range[0]}-${range[1]} trên ${total} sản phẩm`;
            }}
            current={current}
            defaultPageSize={pageSize}
            defaultCurrent={current}
            onChange={onChangePagination}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
