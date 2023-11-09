import { BookOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { Badge, Input, Layout } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserNavigation from "../UserNavigation";

const { Header: HeaderLayout } = Layout;
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.account);

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
        {/* Logo */}
        <BookOutlined
          style={{
            color: "aqua",
            fontSize: "32px",
            margin: "0 20px 0 20px",
          }}
          onClick={() => navigate("/")}
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

          {user?.id ? (
            <UserNavigation />
          ) : (
            <Space>
              <Button size={"large"} onClick={() => navigate("/login")}>
                Đăng nhập
              </Button>
              <Button size={"large"} onClick={() => navigate("/register")}>
                Đăng ký
              </Button>
            </Space>
          )}
        </Space>
      </HeaderLayout>
    </Layout>
  );
};

export default Header;
