import { FireTwoTone } from "@ant-design/icons";
import { Card, Divider, Rate, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

const ListBooks = (Props) => {
  const { dataListBooks } = Props;
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

  const handleRedirectBook = (book) => {
    const slug = toSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };
  return (
    <div className="flex flex-wrap justify-start 2xl:gap-4 gap-2">
      {dataListBooks.map((book) => {
        return (
          <Card
            key={book.key}
            hoverable
            onClick={() => {
              handleRedirectBook(book);
            }}
            bodyStyle={{ padding: 12 }}
            className="2xl:w-[15%] xl:w-[19%] lg:w-[24%] md:w-[49%] sm:w-[100%] border-2 mt-3"
            cover={
              <img
                alt="example"
                src={`${import.meta.env.VITE_SERVER_URL}images/book/${
                  book.thumbnail
                }`}
              />
            }
            actions={[
              <Space
                key={1}
                size={"small"}
                className="flex justify-center books-center"
              >
                Giao hàng siêu tốc
                <FireTwoTone twoToneColor="#eb2f2f" />
              </Space>,
            ]}
          >
            <Meta
              className={"p-0"}
              title={book.mainText}
              // description="Tư duy về tiền bạc - Những lựa chọn tài chính đúng đắn và sáng suốt hơn"
            />
            <Space className="my-2 flex justify-between books-center">
              <Rate
                disabled
                className="xl:text-sm md:text-[10px]"
                defaultValue={5}
              />
              <Divider type="vertical" style={{ margin: "0" }} />
              <Space key={2} className="text-[10px]">
                Đã bán:{book.sold}
              </Space>
            </Space>
            <Space className="font-semibold mt-2">
              {`${book.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
            </Space>
          </Card>
        );
      })}
    </div>
  );
};

export default ListBooks;
