import axios from "axios";
import { config } from "../config";

const instance = axios.create({
  baseURL: config.PAYMENT_API_BASE_URL,
  headers: { Accept: "*/*", "Content-Type": "application/json" },
});

export interface BillBody {
    id: string;
    status: string;
    amountPaid: number;
    changeGiven: number;
    transactionCashLog: {
        cash: {
            id: string;
        };
        insertAt: string;
    };
    productId: string;
}

interface PaymentClient {
    getBillById(billId: string): Promise<BillBody>;
    createBill(productId: string): Promise<BillBody>;
    cancelBill(billId: string): Promise<Boolean>;
}

const paymentClient: PaymentClient = {
    getBillById: async (billId: string) => {
        const response = await instance.get("/", {
            params: {
                id: billId,
            },
        });
        return response.data?.data;
    },
    createBill: async (productId: string) => {
        const response = await instance.post("/", {
            productId,
        });
        return response.data?.data;
    },
    cancelBill: async (billId: string) => {
        const response = await instance.patch(`/void/${billId}`);
        return response.data?.data.success;
    },
};

export default paymentClient;
