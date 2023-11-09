import { Button, Col, Form, Input, Row, Space, Table, theme } from "antd";
import { useEffect, useState } from "react";
import { fetchUserWithPaginate } from "../../../services/api";

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
    render: () => <a>action</a>,
  },
];

const UserTable = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetchUserWithPaginate(
          current,
          pageSize,
          filters.join("")
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
  }, [current, pageSize, filters]);

  const onChange = async (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    console.log(`sorter:`, sorter);

    if (pagination && pagination.current !== current) {
      setCurrent(() => pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(() => pagination.pageSize);
    }
  };

  const AdvancedSearchForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);
    const formStyle = {
      maxWidth: "none",
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      padding: 24,
    };
    const getFields = () => {
      const inputSearch = [
        {
          key: 1,
          label: "Tên hiển thị",
          name: "fullName",
          placeholder: "Vui lòng nhập từ tìm kiếm.",
        },

        {
          key: 2,
          label: "Email",
          name: "email",
          placeholder: "Vui lòng nhập email.",
        },
        {
          key: 3,
          label: "Số điện thoại",
          name: "phoneNumber",
          placeholder: "Vui lòng nhập số điện thoại.",
        },
      ];

      return inputSearch.map((item) => {
        return (
          <Col span={8} key={item.key}>
            <Form.Item
              name={item.name}
              label={item.label}
              rules={[
                {
                  message: "Input something!",
                },
              ]}
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          </Col>
        );
      });
    };
    const onFinishSearch = (values) => {
      console.log("Received values of form: ", values);
      const { fullName, email, phoneNumber } = values;
      if (fullName) {
        setFilters((state) => [...state, `&fullName=/${fullName.trim()}/i`]);
      }
      if (email) {
        setFilters((state) => [...state, `&email=/${email.trim()}/i`]);
      }
      if (phoneNumber) {
        setFilters((state) => [...state, `&phone=/${phoneNumber.trim()}/i`]);
      }
    };
    return (
      <Form
        className="mb-5"
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinishSearch}
      >
        <Row gutter={24}>{getFields()}</Row>
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
            <Button
              onClick={() => {
                setFilters([]);
              }}
            >
              Dọn dẹp
            </Button>
            <a
              style={{
                fontSize: 12,
              }}
              onClick={() => {
                setExpand(!expand);
              }}
            ></a>
          </Space>
        </div>
      </Form>
    );
  };

  return (
    <>
      <AdvancedSearchForm />

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
    </>
  );
};

export default UserTable;
