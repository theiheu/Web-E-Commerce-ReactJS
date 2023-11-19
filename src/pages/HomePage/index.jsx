import {
  Breadcrumb,
  Divider,
  Layout,
  Space,
  Checkbox,
  theme,
  Row,
  Col,
  Form,
  Input,
  Button,
  Rate,
  Tabs,
  Card,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { FilterOutlined, RedoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import { fetchBooksCategory, fetchBooksWithPaginate } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchListCategory } from "../../redux/managerBooksSlice";
const { Content, Sider } = Layout;

// const products = Array(5)
//   .fill(null)
//   .map(() => {
//     return (
//       <Card
//         key={3}
//         hoverable
//         className="xl:w-[19%] lg:w-[24%] md:w-[49%] sm:w-[100%] border-2"
//         cover={
//           <img
//             alt="example"
//             src="server/public/images/book/11-dc801dd2a968c1a43ec9270728555fbe.jpg"
//           />
//         }
//         actions={[
//           <Rate className={"text-[12px]"} defaultValue={5} key={1} disabled />,
//           <Space key={2} className="text-[12px]">
//             Đã bán: 1000k
//           </Space>,
//         ]}
//       >
//         <Meta
//           className={"p-0"}
//           title="Tư duy về tiền bạc - Những lựa chọn tài chính đúng đắn và sáng suốt hơn"
//           description="Tư duy về tiền bạc - Những lựa chọn tài chính đúng đắn và sáng suốt hơn"
//         />
//       </Card>
//     );
//   });

const CheckboxGroup = Checkbox.Group;
const HomePage = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState([]);
  const [softs, setSofts] = useState("-updatedAt");

  const dispatch = useDispatch();
  const [checkedList, setCheckedList] = useState([]);

  const [dataBook, setDataBook] = useState([]);
  const { dataListBooks, listCategory } = useSelector(
    (state) => state?.managerBooks
  );
  // console.log(`dataListBooks:`, dataListBooks);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetchBooksWithPaginate(
          current,
          pageSize,
          filters.join(""),
          softs
        );

        const { meta, result } = res.data.data;

        setCurrent(() => meta.current);
        setPageSize(() => meta.pageSize);
        setTotal(() => meta.total);

        dispatch(fetchBooks(result));

        const resListCategory = await fetchBooksCategory();

        if (resListCategory && resListCategory.data) {
          const dataListCategory = resListCategory.data.data.map((value) => {
            return {
              value,
              label: value,
            };
          });

          dispatch(fetchListCategory(dataListCategory));
        }
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

    // setCheckedList(list);
  };

  const onChangeCategory = (list) => {
    console.log(`list:`, list);

    setCheckedList(list);
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const onChangeProductTab = (key) => {
    console.log(key);
  };

  const itemsProductTab = [
    {
      key: "1",
      label: "Phổ biến",
      children: (
        <div className="flex flex-wrap justify-start 2xl:gap-4 gap-2">
          {dataListBooks.map((item) => {
            return (
              <Card
                key={item.key}
                hoverable
                bodyStyle={{ padding: 12 }}
                className="2xl:w-[15%] xl:w-[19%] lg:w-[24%] md:w-[49%] sm:w-[100%] border-2 mt-3"
                cover={
                  <img
                    alt="example"
                    src={`${import.meta.env.VITE_SERVER_URL}images/book/${
                      item.thumbnail
                    }`}
                  />
                }
                actions={[
                  <Rate
                    className={"text-[12px]"}
                    defaultValue={5}
                    key={1}
                    disabled
                  />,
                  <Space key={2} className="text-[12px]">
                    Đã bán:{item.sold}
                  </Space>,
                ]}
              >
                <Meta
                  className={"p-0"}
                  title={item.mainText}
                  description="Tư duy về tiền bạc - Những lựa chọn tài chính đúng đắn và sáng suốt hơn"
                />
                <Space className="mt-4 font-normal">
                  Giá bán:
                  {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
                </Space>
              </Card>
            );
          })}
        </div>
      ),
    },
    {
      key: "2",
      label: "Hàng Mới",
      children: <></>,
    },
    {
      key: "3",
      label: "Giá Thấp Đến Cao",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Giá Cao Đến Thấp",
      children: "Content of Tab Pane 4",
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      className="mt-3"
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        width={300}
        style={{
          background: colorBgContainer,
        }}
      >
        <Space className="flex justify-between p-3">
          <Space>
            <FilterOutlined />
            Bộ lọc tìm kiếm
          </Space>
          <RedoOutlined
            className="cursor-pointer"
            onClick={() => setCheckedList([])}
          />
        </Space>
        <Divider className="m-0" />

        {/* Danh sách tìm kiếm */}
        <Space className="flex flex-col items-start p-3 ">
          <Space>Danh sách tìm kiếm:</Space>
          <CheckboxGroup value={checkedList} onChange={onChangeCategory}>
            <Row className="flex flex-col items-start ">
              {listCategory?.map((item) => {
                return (
                  <Col key={uuidv4()}>
                    <Checkbox value={item?.value}>{item?.label}</Checkbox>
                  </Col>
                );
              })}
            </Row>
          </CheckboxGroup>
        </Space>
        <Divider />

        {/* Khoảng giá: */}
        <Space className="flex flex-col items-start p-3">
          Khoảng giá:
          <Form
            form={form}
            initialValues={{
              layout: formLayout,
            }}
            onValuesChange={onFormLayoutChange}
            className="w-full"
          >
            <Space className="flex justify-center items-center w-full">
              <Form.Item className="flex-1 h-[20px]">
                <Input className="w-full p-2" placeholder="đ Từ" />
              </Form.Item>
              -
              <Form.Item className="flex-1 h-[20px]">
                <Input className="w-full p-2" placeholder="đ Đến" />
              </Form.Item>
            </Space>
            <Form.Item className=" mt-3">
              <Button className="w-full" type="primary" size="large">
                Áp dụng
              </Button>
            </Form.Item>
          </Form>
        </Space>
        <Divider />

        {/* Rate */}
        <Space className="flex flex-col items-start p-3">
          <Space>Đánh giá:</Space>

          <Space className="flex flex-col items-start justify-start">
            <Space>
              <Rate defaultValue={5} disabled />
            </Space>
            <Space className="ant-rate-text">
              <Rate defaultValue={4} disabled />
              Trở lên
            </Space>
            <Space className="ant-rate-text">
              <Rate defaultValue={3} disabled />
              Trở lên
            </Space>
            <Space className="ant-rate-text">
              <Rate defaultValue={2} disabled />
              Trở lên
            </Space>
            <Space className="ant-rate-text">
              <Rate defaultValue={1} disabled />
              Trở lên
            </Space>
          </Space>
        </Space>
      </Sider>
      <Layout
        style={{
          padding: "0 24px 24px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={itemsProductTab}
            onChange={onChangeProductTab}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
