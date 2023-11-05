import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Space } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;

const items = [
  {
    type: "divider",
  },
  {
    label: "Đăng xuất",
    key: "3",
  },
];

const Admin = () => {
  const user = useSelector((state) => state?.account?.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-black w-full h-[60px] bg-slate-300 flex justify-center items-center mb-5">
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
