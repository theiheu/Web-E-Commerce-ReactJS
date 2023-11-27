import { Button, Space, Steps, Table, message, theme } from "antd";
import Layout, { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import Quantity from "../../components/QuantityInput";
import { DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  handleProductToOrder,
  handleQuantity,
  handleRemoveProductToCart,
} from "../../redux/orderSlice";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Checkout from "../../components/Checkout";

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
  const [totalPrice, setTotalPrice] = useState(0);
  const dataCarts = useSelector((state) => state.order.carts);
  const dataOrder = useSelector((state) => state.order.order);
  let idProductOrder;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

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
    if (dataCarts) {
      dataCarts.map((item) => {
        sum += item.quantity * item.detail.price;
      });

      setTotalPrice(sum);
    }
  }, [dataCarts]);

  const handleClickProductCarts = (products) => {
    const slug = toSlug(products.detail.mainText);
    navigate(`/book/${slug}?id=${products._id}`);
  };

  function formatVnd(value) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      idProductOrder = selectedRows.map((item) => {
        return item.id;
      });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleSubmit = () => {
    console.log("Line: 124 - Here", idProductOrder);
    if (idProductOrder) {
      dispatch(handleProductToOrder(idProductOrder));
    }
  };

  const dataTable = (data) => {
    return data.map((values) => {
      return {
        key: uuidV4(),
        id: values._id,
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
          <span className="text-red-500">
            {formatVnd(values.detail.price)}đ
          </span>
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
  };

  const steps = [
    {
      title: "Giỏ hàng",
      content: (
        <div className="flex max-xl:flex-col gap-4 p-5">
          <Table
            className="xl:w-5/6"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataTable(dataCarts)}
            locale={{ emptyText: "Không có sản phẩm trong giỏ hàng" }}
            pagination={false}
          />

          <div className="xl:w-1/6 flex flex-col bg-white rounded-xl p-3 h-fit leading-none">
            <Space className="flex flex-col items-start">
              <h3>Tạm tính:</h3>
              <span>{formatVnd(totalPrice)}đ</span>
            </Space>
            <Space className="flex flex-col items-start">
              <h3>Tỗng tiền:</h3>
              <span>{formatVnd(totalPrice)}đ</span>
            </Space>

            <div className="w-full flex flex-col gap-2 mt-3">
              <Button
                size="large"
                type="primary"
                danger
                className="w-full"
                onClick={() => {
                  if (idProductOrder) {
                    dispatch(handleProductToOrder(idProductOrder));
                    next();
                  } else {
                    message.error("Vui lòng chọn sản phẩm.");
                  }
                }}
              >
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Đặt hàng",
      content: (
        <div className="flex max-xl:flex-col gap-4 p-5">
          <Table
            className="xl:w-4/6"
            columns={columns}
            dataSource={dataTable(dataOrder)}
            locale={{ emptyText: "Không có sản phẩm trong giỏ hàng" }}
            pagination={false}
          />
          <Checkout next={next} />
        </div>
      ),
    },
    {
      title: "Hoàn thành",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <Layout>
      <Content>
        <Steps style={{ padding: "8px" }} current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
            padding: 8,
          }}
        >
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Trở lại
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Order;
