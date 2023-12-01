import {
  Divider,
  Layout,
  Space,
  Checkbox,
  theme,
  Row,
  Col,
  Form,
  Button,
  Rate,
  Slider,
  InputNumber,
  Drawer,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { FilterOutlined, RedoOutlined } from "@ant-design/icons";
import "./sideBar.scss";

import { useEffect, useState } from "react";
import {
  fetchBooksCategory,
  fetchBooksWithPaginateHomePage,
} from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchListCategory } from "../../redux/managerBooksSlice";
import { useOutletContext } from "react-router-dom";
import UserNavigation from "../UserNavigation";
const { Sider } = Layout;

const CheckboxGroup = Checkbox.Group;
const Sidebar = () => {
  const [open, setOpen] = useOutletContext();

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState();

  const [filters, setFilters] = useState([]);
  const [filtersListSearch, setFiltersListSearch] = useState([]);
  const softs = "-sold";

  const [checkedList, setCheckedList] = useState([]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { listCategory } = useSelector((state) => state?.managerBooks);
  // const [dataBook, setDataBook] = useState([]);

  const [range, setRange] = useState([0, 500000]);

  const toVND = (values) => {
    return `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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

  const onChangeCategory = (list) => {
    setFiltersListSearch(() => `category=${list.join(",")}`);
    setFilters(filtersListSearch);
    setCheckedList(list);
  };

  const onFormLayoutChange = (props) => {
    console.log(`layout:`, props);
  };

  const onFinish = () => {
    setFilters(() => {
      return `${filtersListSearch}&price>=${range[0]}&price<=${range[1]}`;
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClose = () => {
    setOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Drawer
        placement={"left"}
        onClose={onClose}
        open={open}
        footer={
          <Space>
            <UserNavigation />
          </Space>
        }
      >
        <Sider
          width={"100%"}
          style={{
            background: colorBgContainer,
          }}
        >
          <Form
            form={form}
            initialValues={{
              layout: "horizontal",
            }}
            onValuesChange={onFormLayoutChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="w-full p-2"
          >
            <Space className="flex justify-between p-3">
              <Space>
                <FilterOutlined />
                Bộ lọc tìm kiếm
              </Space>
              <RedoOutlined
                className="cursor-pointer"
                onClick={() => {
                  setCheckedList([]);
                  setRange([0, 500000]);
                  setFilters([]);
                }}
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
            <Form.Item>
              Khoảng giá:
              <Row>
                <Col span={24} className="my-2">
                  <InputNumber
                    min={0}
                    max={toVND(range[1])}
                    defaultValue="0"
                    value={toVND(range[0])}
                    onChange={(value) => {
                      if (value === null) {
                        return;
                      }
                      setRange([
                        value >= range[1] ? range[1] : value,
                        range[1],
                      ]);
                    }}
                    addonAfter="VND"
                  />
                </Col>
                Đến
                <Col span={24}>
                  <InputNumber
                    min={toVND(range[0])}
                    max={1000000}
                    value={toVND(range[1])}
                    onChange={(value) => {
                      setRange([
                        range[0],
                        value <= range[0] ? range[0] : value,
                      ]);
                    }}
                    addonAfter="VND"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Slider
                    tooltip={{ open: false }}
                    range
                    step={1000}
                    min={0}
                    max={1000000}
                    value={range}
                    onChange={(values) => {
                      setRange(values);
                    }}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="w-full" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
          <Divider className="mt-0" />
          {/* Rate */}
          <Space className="flex flex-col items-start p-3">
            <Space>Đánh giá:</Space>

            <Space className="flex flex-col items-start justify-start">
              <Space>
                <Rate className="text-sm" defaultValue={5} disabled />
              </Space>
              <Space className="ant-rate-text">
                <Rate className="text-sm" defaultValue={4} disabled />
                Trở lên
              </Space>
              <Space className="ant-rate-text">
                <Rate className="text-sm" defaultValue={3} disabled />
                Trở lên
              </Space>
              <Space className="ant-rate-text">
                <Rate className="text-sm" defaultValue={2} disabled />
                Trở lên
              </Space>
              <Space className="ant-rate-text">
                <Rate className="text-sm" defaultValue={1} disabled />
                Trở lên
              </Space>
            </Space>
          </Space>
        </Sider>
      </Drawer>
      <Sider
        className="max-md:hidden"
        width={250}
        style={{
          background: colorBgContainer,
        }}
      >
        <Form
          form={form}
          initialValues={{
            layout: "horizontal",
          }}
          onValuesChange={onFormLayoutChange}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="w-full p-2"
        >
          <Space className="flex justify-between p-3">
            <Space>
              <FilterOutlined />
              Bộ lọc tìm kiếm
            </Space>
            <RedoOutlined
              className="cursor-pointer"
              onClick={() => {
                setCheckedList([]);
                setRange([0, 500000]);
                setFilters([]);
              }}
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
          Khoảng giá:
          <Form.Item>
            <Row>
              <Col span={24} className="my-2">
                <InputNumber
                  min={0}
                  max={toVND(range[1])}
                  defaultValue="0"
                  value={toVND(range[0])}
                  onChange={(value) => {
                    if (value === null) {
                      return;
                    }
                    setRange([value >= range[1] ? range[1] : value, range[1]]);
                  }}
                  addonAfter="VND"
                />
              </Col>
              Đến
              <Col span={24}>
                <InputNumber
                  min={toVND(range[0])}
                  max={1000000}
                  value={toVND(range[1])}
                  onChange={(value) => {
                    setRange([range[0], value <= range[0] ? range[0] : value]);
                  }}
                  addonAfter="VND"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Slider
                  tooltip={{ open: false }}
                  range
                  step={1000}
                  min={0}
                  max={1000000}
                  value={range}
                  onChange={(values) => {
                    setRange(values);
                  }}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
        <Divider className="mt-0" />
        {/* Rate */}
        <Space className="flex flex-col items-start p-3">
          <Space>Đánh giá:</Space>

          <Space className="flex flex-col items-start justify-start">
            <Space>
              <Rate className="text-sm" defaultValue={5} disabled />
            </Space>
            <Space className="ant-rate-text">
              <Rate className="text-sm" defaultValue={4} disabled />
              Trở lên
            </Space>
            <Space className="ant-rate-text">
              <Rate className="text-sm" defaultValue={3} disabled />
              Trở lên
            </Space>
            <Space className="ant-rate-text">
              <Rate className="text-sm" defaultValue={2} disabled />
              Trở lên
            </Space>
            <Space className="ant-rate-text">
              <Rate className="text-sm" defaultValue={1} disabled />
              Trở lên
            </Space>
          </Space>
        </Space>
      </Sider>
    </>
  );
};

export default Sidebar;
