import { Breadcrumb, Layout, Menu, theme } from "antd";
import React from "react";
// import { useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const itemsBreadcrumb = [
  {
    title: "Home",
  },
  {
    title: <a href="">Application Center</a>,
  },
  {
    title: <a href="">Application List</a>,
  },
  {
    title: "An Application",
  },
];

const HomePage = () => {
  // const navigate = useNavigate();
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  return (
    <div>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
          items={itemsBreadcrumb}
        ></Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgLayout,
          }}
        >
          <Sider
            style={{
              background: colorBgLayout,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Content>
    </div>
  );
};

export default HomePage;
