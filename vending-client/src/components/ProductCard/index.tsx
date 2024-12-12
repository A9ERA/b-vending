import React, { useEffect, useState } from "react";
import productClient, {
  GetProductResponseBody,
} from "../../libs/product-client";
import { Card, Skeleton } from "antd";
import { config } from "../../config";
import "./index.scss";

const { Meta } = Card;

interface ProductCardProps {
  productId: string;
  isProductOutOfStock?: boolean;
  setInterest: React.Dispatch<
    React.SetStateAction<GetProductResponseBody | undefined>
  >;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  setInterest,
  isProductOutOfStock = false,
}) => {
  const [productData, setProductData] = useState<GetProductResponseBody>();

  const fetchProductData = async () => {
    const data = await productClient.getProductById(productId);
    setProductData(data);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <Card
        hoverable={!isProductOutOfStock}
        loading={!productData}
        style={{ width: 240, height: 340 }}
        onClick={() => !isProductOutOfStock && setInterest(productData)}
        cover={
          !productData ? (
            <Skeleton.Image style={{ width: "100%", height: 180 }} active />
          ) : (
            <img
              className="img-preview"
              src={`${config.MEDIA_API_BASE_URL}?id=${productData?.previewPicId}`}
              style={{
                filter: isProductOutOfStock ? "grayscale(100%)" : "unset",
              }}
            />
          )
        }
      >
        <Meta
          title={productData?.title}
          description={
            isProductOutOfStock ? (
              <h2 style={{ color: "#bd0000" }}>Out of stock</h2>
            ) : (
              <h2 style={{ color: "#000" }}>{productData?.price}฿</h2>
            )
          }
        />
      </Card>
    </>
  );
};

export default ProductCard;
