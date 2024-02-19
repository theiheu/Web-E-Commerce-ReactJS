import {
  BookOutlined,
  ClusterOutlined,
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Space, Divider } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserNavigation from "../../components/UserNavigation";

const { Header, Sider, Content } = Layout;

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
    <Link to={"/admin/dash-board"}>Dash Board</Link>,
    "dardboad",
    <DesktopOutlined />
  ),
  getItem(
    <Link to={"/admin/user"}>Manage Users</Link>,
    "managerUser",
    <UserOutlined />
  ),
  getItem(
    <Link to={"/admin/books"}>Manage Books</Link>,
    "manageBooks",
    <BookOutlined />
  ),
  getItem(
    <Link to={"/admin/order"}>Manage Orders</Link>,
    "manageOrders",
    <FileOutlined />
  ),
];

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Sider
        style={{ background: "#ffff" }}
        width={200}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Space className="p-4 flex justify-center items-center text-2xl">
          <ClusterOutlined />
          {collapsed ? "" : "Quản trị"}
        </Space>
        <Divider className="mt-0" />
        <Menu
          mode="inline"
          defaultSelectedKeys={["dardboad"]}
          defaultOpenKeys={["dardboad"]}
          style={{ height: "100%" }}
          items={MenuAdmin}
        />
      </Sider>
      <Content>
        <Layout>
          <Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
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
      </Content>
    </Layout>
  );
};
export default AdminPage;
