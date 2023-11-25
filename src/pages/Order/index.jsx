import { Button, Space, Table } from "antd";
import Layout, { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import Quantity from "../../components/QuantityInput";
import { DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  handleQuantity,
  handleRemoveProductToCart,
} from "../../redux/orderSlice";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Đơn giá",
    dataIndex: "price",
    width: 200,
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    width: 200,
  },
  {
    title: "Thành tiền",
    dataIndex: "total",
    width: 200,
  },
  {
    title: "Hành động",
    dataIndex: "action",
    width: 120,
  },
];

const Order = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dataOrder = useSelector((state) => state.order.carts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toSlug = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str
      .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    str = str.replace(/[đĐ]/g, "d");

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // Xóa ký tự - liên tiếp
    str = str.replace(/-+/g, "-");

    // xóa phần dư - ở đầu & cuối
    str = str.replace(/^-+|-+$/g, "");

    // return
    return str;
  };

  useEffect(() => {
    let sum = 0;
    if (dataOrder) {
      dataOrder.map((item) => {
        sum += item.quantity * item.detail.price;
      });

      setTotalPrice(sum);
    }
  }, [dataOrder]);

  const handleClickProductCarts = (products) => {
    const slug = toSlug(products.detail.mainText);
    navigate(`/book/${slug}?id=${products._id}`);
  };

  function formatVnd(value) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const data = dataOrder.map((values) => {
    return {
      key: uuidV4(),
      product: (
        <div
          className="flex cursor-pointer"
          onClick={() => {
            handleClickProductCarts(values);
          }}
        >
          <img
            className="w-[50px] mr-2"
            src={`${import.meta.env.VITE_SERVER_URL}images/book/${
              values.detail.thumbnail
            }`}
            alt=""
          />
          <h3 className=" text-black m-0 line-clamp-2">
            {values.detail.mainText}
          </h3>
        </div>
      ),
      price: (
        <span className="text-red-500">{formatVnd(values.detail.price)}đ</span>
      ),
      quantity: (
        <Quantity
          hiddenTitle
          type={"vertical"}
          value={values.quantity}
          onChange={(value) => {
            return dispatch(
              handleQuantity({ _id: values._id, quantity: value })
            );
          }}
        />
      ),
      total: (
        <span className="text-gray-500">
          {formatVnd(values.detail.price * values.quantity)} đ
        </span>
      ),
      action: (
        <div className="text-center">
          <DeleteTwoTone
            style={{
              fontSize: 20,
              paddingRight: 0,
              cursor: "pointer",
            }}
            twoToneColor={"#bababa"}
            onClick={() => {
              dispatch(handleRemoveProductToCart(values._id));
            }}
          />
        </div>
      ),
    };
  });
  return (
    <Layout className="mt-30">
      <Content className="flex max-xl:flex-col gap-4 p-5">
        <Table
          className="xl:w-5/6"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />

        <div className="xl:w-1/6 w-3/6 flex flex-col bg-white rounded-xl p-3 h-fit">
          <Space className="flex flex-col items-start">
            <h3>Tạm tính:</h3>
            <span>{formatVnd(totalPrice)}đ</span>
          </Space>
          <Space className="flex flex-col items-start">
            <h3>Tỗng tiền:</h3>
            <span>{formatVnd(totalPrice)}đ</span>
          </Space>

          <div className="w-full flex flex-col gap-2 mt-3">
            <Button size="large" type="primary" danger className="w-full">
              Mua hàng
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Order;