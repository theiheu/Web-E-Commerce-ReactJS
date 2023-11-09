import { BookOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, message } from "antd";
import { Badge, Input, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../services/api";

const { Header: HeaderLayout } = Layout;
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const items = [
  {
    label: <Link to="/admin">Quản lý tài khoản</Link>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: "Đăng xuất",
    key: "logout",
    danger: "true",
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state?.account);

  const handleLogout = async () => {
    try {
      const res = await callLogout();
      console.log(`res:`, res);

      dispatch(doLogoutAction());
      message.success("Bạn đã đăng xuất thành công!");
      navigate("/login");
    } catch (error) {
      console.log(`error:`, error);
    }
  };

  const handleMenuClick = (e) => {
    // console.log("click", e);
    if (e.key == "logout") {
      handleLogout();
    }
  };
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
            <Dropdown
              menu={{
                items: user?.role === "ADMIN" ? items : [items[2]],
                onClick: handleMenuClick,
              }}
              trigger={["click"]}
              style={{
                width: "120px",
              }}
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Space
                  style={{
                    width: "120px",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {user?.fullName || "Tài khoản"}
                  <UserOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  />
                </Space>
              </a>
            </Dropdown>
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
