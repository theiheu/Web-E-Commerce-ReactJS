import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { callDashBoard } from "../../../services/api";

const formatter = (value) => <CountUp end={value} separator="," />;
const DashBoard = () => {
  const [order, setOrder] = useState(0);
  const [user, setUser] = useState(0);

  useEffect(() => {
    const fetchDataDashBoard = async () => {
      const res = await callDashBoard();
      console.log(`res:`, res);
      if (res && res.status) {
        setOrder(res?.data?.data?.countOrder);
        setUser(res?.data?.data?.countUser);
      }
    };

    fetchDataDashBoard();
  }, []);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Người dùng"
            value={user}
            precision={2}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic title="Đơn đặt hàng" value={order} formatter={formatter} />
        </Card>
      </Col>
    </Row>
  );
};

export default DashBoard;
