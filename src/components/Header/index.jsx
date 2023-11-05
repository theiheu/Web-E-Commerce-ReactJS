import { BookOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Badge, Input, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Header: HeaderLayout } = Layout;
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const items = [
  {
    label: <a href="https://www.antgroup.com">Quản lý tài khoản</a>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: "Đăng xuất",
    key: "3",
  },
];

const Header = () => {
  const user = useSelector((state) => state?.account?.user);

  return (
    <Layout>
      <HeaderLayout
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <BookOutlined
          style={{
            color: "aqua",
            fontSize: "32px",
            margin: "0 20px 0 20px",
          }}
        />
        <Search
          className="mx-2"
          size="large"
          placeholder="Bạn muốn tìm gì?"
          onSearch={onSearch}
          enterButton
        />

        <Space size="large" className="flex justify-center items-center">
          <Badge
            className="flex justify-center items-center mx-2 cursor-pointer"
            count={99}
            overflowCount={10}
          >
            <ShoppingCartOutlined className="text-[32px]" />
          </Badge>

          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            style={{
              width: "120px",
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space
                style={{
                  width: "120px",
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Tài khoản
                <UserOutlined
                  style={{
                    fontSize: "20px",
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </Space>
      </HeaderLayout>
    </Layout>
  );
};

export default Header;
