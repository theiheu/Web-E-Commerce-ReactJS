import { Badge, Descriptions } from "antd";
import moment from "moment";

const DetailUsers = (Props) => {
  const { dataUser } = Props;

  return (
    <Descriptions
      title="Thông tin người dùng:"
      layout="horizontal"
      bordered
      column={1}
    >
      <Descriptions.Item label="ID" key={1}>
        {dataUser._id}
      </Descriptions.Item>
      <Descriptions.Item label="Email" key={2}>
        {dataUser.email}
      </Descriptions.Item>
      <Descriptions.Item label="Role" key={3}>
        <Badge status="processing" text={dataUser.role} />
      </Descriptions.Item>
      <Descriptions.Item label="Created At:" key={4}>
        {moment(dataUser.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </Descriptions.Item>
      <Descriptions.Item label="Tên hiển thị" key={5}>
        {dataUser.fullName}
      </Descriptions.Item>
      <Descriptions.Item label="Số điện thoại" key={6}>
        {dataUser.phone}
      </Descriptions.Item>
      <Descriptions.Item label="Update At:" key={7}>
        {dataUser.updatedAt}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default DetailUsers;
