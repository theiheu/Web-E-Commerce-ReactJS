import { Layout } from "antd";

const { Footer: FooterLayout } = Layout;

const Footer = () => {
  return (
    <FooterLayout
      className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
      style={{
        textAlign: "center",
        background: "#bcbaba33",
        marginTop: "12px",
      }}
    >
      LTH ©2023 Created by lth
    </FooterLayout>
  );
};

export default Footer;
