import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { fetchListOrderWithPaginate } from "../../services/api";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

function formatVnd(value) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const columns = [
  {
    title: "Thời gian",
    dataIndex: "createdAt",
    key: uuidv4(),
    render: (text) => {
      return `${moment(text).subtract(10, "days").calendar()} - ${moment(
        text
      ).format("LT")}`;
    },
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalPrice",
    key: uuidv4(),
    render: (text) => {
      return <>{formatVnd(text)}đ</>;
    },
  },
  {
    title: "Trạng thái",
    key: uuidv4(),
    dataIndex: "status",
    render: () => (
      <>
        <Tag color={"green"} key={"green"}>
          Thành công
        </Tag>
      </>
    ),
  },
  {
    title: "Đơn mua",
    key: uuidv4(),
    width: 300,
    render: (_, record) => {
      return record.detail.map((values) => {
        return (
          <div key={uuidv4()} className="flex justify-start items-center">
            <h5 className="flex-1">{values.bookName}</h5>
            <span className="ml-3">X{values.quantity}</span>
          </div>
        );
      });
    },
  },
];

const OrderHistory = () => {
  const [dataOrderHistory, setDataOrderHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchListOrderWithPaginate();
        if (res) {
          const newData = res?.data?.data?.result.map((values) => {
            return {
              key: uuidv4(),
              ...values,
            };
          });
          setDataOrderHistory(newData);
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
        // Handle errors or log them as needed
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div className="p-3" key={uuidv4()}>
      <h3 className="font-sans">Lịch sử đặt hàng:</h3>
      <Table
        columns={columns}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (record) => {
            return (
              <Table
                pagination={false}
                columns={[
                  {
                    title: "Tên người mua",
                    dataIndex: "user",
                    key: uuidv4(),
                  },
                  {
                    title: "Số điện thoại",
                    dataIndex: "phone",
                    key: uuidv4(),
                  },
                  {
                    title: "Địa chỉ",
                    dataIndex: "address",
                    key: uuidv4(),
                  },
                  {
                    title: "Chi tiết",
                    key: uuidv4(),
                  },
                ]}
                dataSource={[
                  {
                    key: uuidv4(),
                    user: record.name,
                    phone: record.phone,
                    address: record.address,
                    detail: record.detail,
                  },
                ]}
              />
            );
          },
        }}
        dataSource={dataOrderHistory}
      />
    </div>
  );
};

export default OrderHistory;
