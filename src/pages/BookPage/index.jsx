import ImageGallery from "react-image-gallery";
import { useLocation } from "react-router-dom";
import { Button, Card, Divider, Input, Layout, List, Rate, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import "./bookPage.scss";
import Quantity from "../../components/QuantityInput";
import { useEffect } from "react";
import { getBookDetailById } from "../../services/api";
import {
  CreditCardTwoTone,
  InteractionTwoTone,
  MinusCircleTwoTone,
  MinusSquareOutlined,
  WalletTwoTone,
} from "@ant-design/icons";
import BookPageSkeleton from "./BookPageSkeleton";

const BookPage = () => {
  let location = useLocation();
  // we can turn the location.search into URLSearchParams
  let params = new URLSearchParams(location.search);
  const idBook = params?.get("id");

  const [dataBookDetail, setDataBookDetail] = useState([]);
  console.log(`dataBookDetail:`, dataBookDetail);

  function formatVnd(value) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
              }images/book/${value}`,
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
      {dataBookDetail ? (
        <Content className="flex max-lg:flex-col gap-4">
          <div className="w-1/4 max-lg:w-full bg-white rounded-xl p-3">
            {images && images.length > 0 ? (
              <ImageGallery
                showNav={false}
                autoPlay={false}
                showFullscreenButton={false}
                slideOnThumbnailOver={true}
                showPlayButton={false}
                items={images}
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex w-full max-sm:flex-col gap-4">
            <div className="w-3/4 max-lg:w-2/3 max-md:w-full">
              <div className="bg-white rounded-xl p-3">
                <h5 className="m-0 font-thin">
                  Tác giả: {dataBookDetail.author}
                </h5>
                <h2>{dataBookDetail.mainText}</h2>
                <div>
                  4.7{" "}
                  {
                    <Rate
                      disabled
                      className="xl:text-sm md:text-[10px]"
                      defaultValue={5}
                    />
                  }
                  (41)
                  <Divider type="vertical" /> Đã bán: {dataBookDetail.sold}
                </div>
                <div className="my-4 text-red-600">
                  {formatVnd(dataBookDetail.price)} ₫ -34%
                </div>
                <div>Vận chuyển: Miễn phí vận chuyển</div>
              </div>
              <div className="bg-white rounded-xl p-3 mt-3">
                <h3>An tâm mua sắm</h3>
                <Divider className="m-2" />
                <span>
                  <WalletTwoTone className="text-xl mr-2" />
                  Được mở hộp kiểm tra khi nhận hàng.
                </span>
                <Divider className="m-2" />
                <span>
                  <InteractionTwoTone className="text-xl mr-2" />
                  Được hoàn tiền 111% nếu là hàng giả.
                </span>
                <Divider className="m-2" />
                <span>
                  <MinusCircleTwoTone className="text-xl mr-2" />
                  Đổi trả miễn phí tại nhà trong 30 ngày nếu sản phẩm lỗi.
                </span>
              </div>
            </div>

            <div className="w-1/4 max-md:w-full max-lg:w-1/3 flex flex-col bg-white rounded-xl p-3 h-fit">
              <Space className="flex flex-col items-start">
                <Quantity
                  type={"vertical"}
                  value={quantity}
                  onChange={(value) => {
                    console.log(`quantity:`, value);
                    return setQuantity(() => value);
                  }}
                />
                <h3>Tạm tính:</h3>
                <span>3,000,300 đ</span>
              </Space>

              <div className="w-full flex flex-col gap-2 mt-3">
                <Button size="large" className="w-full">
                  Thêm vào giỏ hàng
                </Button>
                <Button size="large" type="primary" danger className="w-full">
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
        </Content>
      ) : (
        <BookPageSkeleton />
      )}
    </Layout>
  );
};

export default BookPage;
