import { Button, Carousel, Drawer, Flex, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { GetProductResponseBody } from "../../libs/product-client";
import { config } from "../../config";
import "./index.scss";
import paymentClient, { BillBody } from "../../libs/payment-client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { AxiosError } from "axios";

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;

interface ProductPaymentDrawerProps {
  interesProduct?: GetProductResponseBody;
  onClose?: () => void;
  open: boolean;
}

const ProductPaymentDrawer: React.FC<ProductPaymentDrawerProps> = ({
  interesProduct,
  onClose = () => {},
  open,
}) => {
  const [billData, setBillData] = useState<BillBody>();
  const [isCreatingBill, setIsCreatingBill] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const createBill = async () => {
    if (interesProduct) {
      try {
        setIsCreatingBill(true);
        const bill = await paymentClient.createBill(interesProduct.id);
        setBillData(bill);
      } catch (e) {
        if (e instanceof AxiosError) {
          Modal.error({
            title: e.response?.data?.message || "Error something went wrong",
          });
        }
      } finally {
        setIsCreatingBill(false);
      }
    }
  };

  const updateBill = async () => {
    if (billData) {
      const bill = await paymentClient.getBillById(billData.id);
      switch (bill.status) {
        case "completed":
          console.log("Payment completed");
          setIsPaymentSuccess(true);
          setBillData(bill);
          break;
        case "failed":
        case "cancelled":
          setBillData(undefined);
          handleClosingDrawer();
          break;
        case "pending":
        default:
          setBillData(bill);
      }
    }
  };

  const handleClosingDrawer = async () => {
    if (billData && billData.status === "pending") {
      showConfirmCancelBill();
    } else {
      setIsCreatingBill(false);
      setIsPaymentSuccess(false);
      setBillData(undefined);
      onClose();
    }
  };

  const showConfirmCancelBill = () => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      content: "Do you want to cancel the payment?",
      async onOk() {
        await paymentClient.cancelBill(billData!.id);
        setBillData(undefined);
        setIsCreatingBill(false);
        setIsPaymentSuccess(false);
        onClose();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    if (billData) {
      const interval = setInterval(updateBill, 1000);
      return () => clearInterval(interval);
    }
  }, [billData]);

  return (
    <Drawer
      placement="bottom"
      height={"80%"}
      maskClosable={false}
      // closable={false}
      onClose={handleClosingDrawer}
      open={open}
      key={interesProduct?.id}
    >
      {!isPaymentSuccess ? (
        <>
          <Carousel
            infinite={false}
            dots={{ className: "product-preview-dots" }}
          >
            <div className="preview-img-container">
              <img
                className="preview-img"
                src={`${config.MEDIA_API_BASE_URL}?id=${interesProduct?.previewPicId}`}
              />
            </div>
          </Carousel>

          <Title>{interesProduct?.title}</Title>
          <Paragraph>{interesProduct?.desc}</Paragraph>

          {!billData && (
            <>
              <Flex justify="end">
                <Title level={2}>{interesProduct?.price} THB</Title>
              </Flex>
              <Button
                loading={isCreatingBill}
                color="primary"
                variant="solid"
                onClick={createBill}
              >
                Buy
              </Button>
            </>
          )}

          {billData && interesProduct && (
            <>
              <Title style={{ marginTop: 50 }} level={4}>
                Waiting for payment. Please insert coins or banknotes.
              </Title>
              <Text>
                (Accepted: Coins - 1, 2, 5, 10 THB | Banknotes - 20, 50, 100,
                500, 1,000 THB)
              </Text>

              <Flex style={{ marginTop: 50 }} align="end" vertical>
                <Title level={4}>Total: {interesProduct.price} THB</Title>
                <Text>Amount paid: {billData.amountPaid} THB</Text>
                <Text>
                  Remaining amount: {interesProduct.price - billData.amountPaid}{" "}
                  THB
                </Text>
              </Flex>
            </>
          )}
        </>
      ) : (
        <>
          <Title level={2}>Payment Successful</Title>
          <Title level={4}>Your payment has been completed successfully.</Title>
          <Title level={4}>
            Please collect your change: {billData?.changeGiven} THB
          </Title>
          <Button
            color="primary"
            variant="solid"
            onClick={() => {
              setBillData(undefined);
              handleClosingDrawer();
            }}
          >
            Close
          </Button>
        </>
      )}
    </Drawer>
  );
};

export default ProductPaymentDrawer;
