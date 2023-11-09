import {
  BookOutlined,
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Space, Divider } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import UserNavigation from "../../components/UserNavigation";

const { Header, Sider, Content } = Layout;

const items = [
  { label: <Link to={"/"}>Trang chủ</Link>, key: "1" },

  {
    type: "divider",
  },
  {
    label: "Đăng xuất",
    key: "3",
    danger: true,
    onClick: () => {
      console.log("Line: 28 - Here");
    },
  },
];

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MenuAdmin = [
  getItem(
    <Link to={"/admin"}>Dash Board</Link>,
    "dardboad",
    <DesktopOutlined />
  ),
  getItem(
    <Link to={"/admin/home"}>Manage Users</Link>,
    "manageUsers",
    <TeamOutlined />,
    [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]
  ),
  getItem("Manage Books", "manageBooks", <BookOutlined />),
  getItem("Manage Orders", "manageOrders", <FileOutlined />),
];

const AdminPage = () => {
  ("bottomRight");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-[100vh]">
      <Sider
        style={{ background: colorBgContainer }}
        width={200}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Space className="p-4 flex justify-center items-center">Quản trị</Space>
        {/* <Link to={"/"} className="flex justify-center items-center py-4">
          <BookOutlined
            style={{
              color: "aqua",
              fontSize: "32px",
              margin: "0 20px 0 20px",
            }}
          />
          <span className="text-xl text-slate-600">Trang quản trị</span>
        </Link> */}
        <Divider className="mt-0" />
        <Menu
          mode="inline"
          defaultSelectedKeys={["dardboad"]}
          defaultOpenKeys={["dardboad"]}
          style={{ height: "100%" }}
          items={MenuAdmin}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 4px",
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <UserNavigation />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100%",
            background: colorBgContainer,
          }}
        >
          {<Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminPage;
