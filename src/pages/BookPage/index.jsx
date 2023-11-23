import ImageGallery from "react-image-gallery";
import { useLocation } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import "./bookPage.scss";
import Quantity from "../../components/QuantityInput";
import { useEffect } from "react";
import { getBookDetailById } from "../../services/api";

const BookPage = () => {
  let location = useLocation();
  // we can turn the location.search into URLSearchParams
  let params = new URLSearchParams(location.search);
  const idBook = params?.get("id");

  const [dataBookDetail, setDataBookDetail] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBookDetailById(idBook);
        console.log(`res:`, res);
        setDataBookDetail(res?.data?.data || null); // Use null if data is not available
      } catch (error) {
        console.log(`error:`, error);
      }
    };

    if (idBook) {
      fetchData();
    }
  }, [idBook]);

  useEffect(() => {
    if (dataBookDetail) {
      setImages(() => {
        const imagesThumbnail = {
          original: `${import.meta.env.VITE_SERVER_URL}/images/book/${
            dataBookDetail.thumbnail
          }`,
          thumbnail: `${import.meta.env.VITE_SERVER_URL}/images/book/${
            dataBookDetail.thumbnail
          }`,
        };
        let imagesSlider = [];

        if (dataBookDetail.slider && dataBookDetail.slider.length > 0) {
          imagesSlider = dataBookDetail.slider.map((value) => {
            return {
              original: `${
                import.meta.env.VITE_SERVER_URL
              }/images/book/${value}`,
              thumbnail: `${
                import.meta.env.VITE_SERVER_URL
              }/images/book/${value}`,
            };
          });
        }

        // Combine imagesThumbnail and imagesSlider into a single array
        const combinedImages = [imagesThumbnail, ...imagesSlider];

        return combinedImages;
      });
    }
  }, [dataBookDetail]);

  return (
    <Layout
      style={{
        marginTop: "60px",
        padding: "20px 30px",
        Height: "100vh",
      }}
    >
      <Content className="flex gap-4">
        <div className="w-1/4 min-h-[300px] bg-white rounded-xl p-3">
          {images && images.length > 0 ? <ImageGallery items={images} /> : ""}
        </div>
        <div className="w-2/4 min-h-[300px] bg-white rounded-xl p-3">
          <h5 className="m-0 font-thin">Tác giả: abdbd</h5>
          <h2>Lý Thuyết Trò Chơi</h2>
          <div>4.7 (41) Đã bán 1433</div>
          <div className="my-4">118.000₫ -34%</div>
          <div>Vận chuyển: Miễn phí vận chuyển</div>
        </div>
        <div className="w-1/4 min-h-[300px] flex flex-col bg-white rounded-xl p-3">
          <Space className="flex flex-col items-start flex-1">
            <Quantity
              type={"vertical"}
              onChange={(value) => setQuantity(value)}
            />
            <h3>Tạm tính:</h3>
            <span>3,000,300 đ</span>
          </Space>

          <div className="w-full flex flex-col">
            <Button size="large" type="primary" danger className="w-full">
              Mua ngay
            </Button>
            <Button size="large" className="w-full mt-2">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default BookPage;
