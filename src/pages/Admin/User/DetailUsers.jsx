import { Badge, Descriptions } from "antd";
import moment from "moment";

const DetailUsers = (Props) => {
  const { dataDetailUsers } = Props;

  return (
    <Descriptions
      title="Thông tin người dùng:"
      layout="horizontal"
      bordered
      column={1}
    >
      <Descriptions.Item label="ID" key={1}>
        {dataDetailUsers._id}
      </Descriptions.Item>
      <Descriptions.Item label="Email" key={2}>
        {dataDetailUsers.email}
      </Descriptions.Item>
      <Descriptions.Item label="Role" key={3}>
        <Badge status="processing" text={dataDetailUsers.role} />
      </Descriptions.Item>
      <Descriptions.Item label="Created At:" key={4}>
        {moment(dataDetailUsers.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </Descriptions.Item>
      <Descriptions.Item label="Tên hiển thị" key={5}>
        {dataDetailUsers.fullName}
      </Descriptions.Item>
      <Descriptions.Item label="Số điện thoại" key={6}>
        {dataDetailUsers.phone}
      </Descriptions.Item>
      <Descriptions.Item label="Update At:" key={7}>
        {moment(dataDetailUsers.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default DetailUsers;
