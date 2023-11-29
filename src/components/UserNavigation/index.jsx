import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/accountSlice";

const items = [
  {
    label: <Link to="/">Trang chủ</Link>,
    key: "trangChu",
  },

  {
    label: <Link to="/user">Quản lý tài khoản</Link>,
    key: "quanLy",
  },
  {
    label: <Link to="/orderhistory">Lịch sử đơn hàng</Link>,
    key: "quanLy",
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

const UserNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state?.account);

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

  const urlAvatar = `${import.meta.env.VITE_SERVER_URL}/images/avatar/${
    user.avatar
  }`;

  return (
    <Dropdown
      placement={"top"}
      menu={{
        items: [
          user?.role === "ADMIN"
            ? {
                label: <Link to="/admin">Trang quản trị</Link>,
                key: "quanTri",
              }
            : {},
          ...items,
        ],
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
          <Button
            size="large"
            className="flex justify-center items-center gap-2 p-3"
          >
            <Space
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "60px",
              }}
            >
              {user?.fullName}
            </Space>
            <Avatar size={"middle"} src={urlAvatar} icon={<UserOutlined />} />
          </Button>
        </Space>
      </a>
    </Dropdown>
  );
};

export default UserNavigation;
