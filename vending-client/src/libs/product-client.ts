import axios from "axios";
import { config } from "../config";

const instance = axios.create({
  baseURL: config.PRODUCT_API_BASE_URL,
  headers: { Accept: "*/*", "Content-Type": "application/json" },
});

export interface GetProductResponseBody {
  id: string;
  title: string;
  price: number;
  desc: string | null;
  previewPicId: string | null;
}

interface ProductClient {
  getProductById(productId: string): Promise<GetProductResponseBody>;
}

const productClient: ProductClient = {
  getProductById: async (productId: string) => {
    const response = await instance.get("/", {
      params: {
        id: productId,
      },
    });
    return response.data?.data;
  },
};

export default productClient;
