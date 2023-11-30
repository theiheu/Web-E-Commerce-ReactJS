import ImageGallery from "react-image-gallery";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Divider, Layout, Rate, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import "./bookPage.scss";
import Quantity from "../../components/QuantityInput";
import { useEffect } from "react";
import { getBookDetailById } from "../../services/api";
import {
  HomeOutlined,
  InteractionTwoTone,
  MinusCircleTwoTone,
  ShoppingCartOutlined,
  WalletTwoTone,
} from "@ant-design/icons";
import BookPageSkeleton from "./BookPageSkeleton";
import { useDispatch } from "react-redux";
import {
  handleAddProductToCart,
  handleAddProductToOrder,
  handleStepOrder,
} from "../../redux/orderSlice";

const BookPage = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  // we can turn the location.search into URLSearchParams
  let params = new URLSearchParams(location.search);
  const idBook = params?.get("id");

  const [dataBookDetail, setDataBookDetail] = useState([]);

  function formatVnd(value) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBookDetailById(idBook);
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
        padding: "20px 30px",
        Height: "100vh",
      }}
    >
      <Breadcrumb
        className="mb-2"
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            title: "Trang chủ",
          },
        ]}
      />
      {dataBookDetail && dataBookDetail._id ? (
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
                  Tác giả: <a href="">{dataBookDetail.author}</a>
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
                <h5 className="mt-2 font-thin">
                  Thể loại: <a href="">{dataBookDetail.category}</a>
                </h5>
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
                    return setQuantity(() => value);
                  }}
                />
                <h3>Tạm tính:</h3>
                <span>{formatVnd(dataBookDetail.price * quantity)} đ</span>
              </Space>

              <div className="w-full flex flex-col gap-2 mt-3">
                <Button
                  size="large"
                  className="w-full"
                  onClick={() => {
                    dispath(
                      handleAddProductToCart({
                        _id: idBook,
                        quantity,
                        detail: dataBookDetail,
                      })
                    );
                  }}
                >
                  <ShoppingCartOutlined />
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  size="large"
                  type="primary"
                  danger
                  className="w-full"
                  onClick={() => {
                    dispath(
                      handleAddProductToOrder({
                        _id: idBook,
                        quantity,
                        detail: dataBookDetail,
                      })
                    );
                    dispath(handleStepOrder(1));
                    navigate("/order");
                  }}
                >
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
