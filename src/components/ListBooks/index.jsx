import { FireTwoTone } from "@ant-design/icons";
import { Card, Divider, Rate, Space } from "antd";
import Meta from "antd/es/card/Meta";

const ListBooks = (Props) => {
  const { dataListBooks } = Props;
  return (
    <div className="flex flex-wrap justify-start 2xl:gap-4 gap-2">
      {dataListBooks.map((item) => {
        return (
          <Card
            key={item.key}
            hoverable
            bodyStyle={{ padding: 12 }}
            className="2xl:w-[15%] xl:w-[19%] lg:w-[24%] md:w-[49%] sm:w-[100%] border-2 mt-3"
            cover={
              <img
                alt="example"
                src={`${import.meta.env.VITE_SERVER_URL}images/book/${
                  item.thumbnail
                }`}
              />
            }
            actions={[
              <Space
                key={1}
                size={"small"}
                className="flex justify-center items-center"
              >
                Giao hàng siêu tốc
                <FireTwoTone twoToneColor="#eb2f2f" />
              </Space>,
            ]}
          >
            <Meta
              className={"p-0"}
              title={item.mainText}
              // description="Tư duy về tiền bạc - Những lựa chọn tài chính đúng đắn và sáng suốt hơn"
            />
            <Space className="my-2 flex justify-between items-center">
              <Rate
                disabled
                className="xl:text-sm md:text-[10px]"
                defaultValue={5}
              />
              <Divider type="vertical" style={{ margin: "0" }} />
              <Space key={2} className="text-[10px]">
                Đã bán:{item.sold}
              </Space>
            </Space>
            <Space className="font-semibold mt-2">
              {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
            </Space>
          </Card>
        );
      })}
    </div>
  );
};

export default ListBooks;
