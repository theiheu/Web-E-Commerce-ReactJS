import {
  BarsOutlined,
  BookOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { Button, Space, Tooltip } from "antd";
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
  const productCarts = useSelector((state) => state?.order?.carts);

  function formatVnd(value) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const listProductsCart =
    productCarts && productCarts?.length > 0 ? (
      <div className="flex flex-col items-start cursor-pointer p-0">
        <h4 className="text-gray-300 m-0 pb-2">Sản Phẩm Mới Thêm</h4>
        <div className="max-h-[500px] overflow-auto">
          {productCarts?.map((values) => {
            return (
              <div key={uuidv4()}>
                <Space className="w-full justify-between hover:bg-gray-200 p-2">
                  <div className="flex">
                    <img
                      className="w-[50px]"
                      src={`${import.meta.env.VITE_SERVER_URL}images/book/${
                        values.detail.thumbnail
                      }`}
                      alt=""
                    />
                    <h4 className=" text-black line-clamp-1">
                      {values.detail.mainText}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end mx-2">
                    <span className=" text-red-500">
                      {formatVnd(values.detail.price)}đ
                    </span>
                    <span className="text-gray-600">x{values.quantity}</span>
                  </div>
                </Space>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-between items-center mt-2">
          <h5 className=" text-gray-300 m-0 flex-1">
            {productCarts?.length} Thêm Hàng Vào Giỏ
          </h5>
          <Button type="primary" danger>
            Xem tất cả
          </Button>
        </div>
      </div>
    ) : (
      <h1 className="text-red-600">No data</h1>
    );
  return (
    <Layout>
      <HeaderLayout
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: "0 16px",
        }}
        // onClick={}
      >
        <BarsOutlined
          className="md:hidden"
          style={{
            color: "gray",
            fontSize: "32px",
            margin: "0 20px 0 20px",
          }}
        />
        {/* Logo */}
        <BookOutlined
          className="max-md:hidden"
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
          <Tooltip
            overlayInnerStyle={{
              width: "400px",
              minHeight: "300px",
            }}
            // open
            color="white"
            placement="bottomRight"
            title={listProductsCart}
            arrow={true}
          >
            <Badge
              className="flex justify-center items-center mx-2 cursor-pointer"
              count={productCarts?.length}
              overflowCount={productCarts?.length}
            >
              <ShoppingCartOutlined className="text-[32px]" />
            </Badge>
          </Tooltip>

          <div className="max-lg:hidden">
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
          </div>
        </Space>
      </HeaderLayout>
    </Layout>
  );
};

export default Header;
