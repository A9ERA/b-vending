import axios from "axios";
import { config } from "../config";

const instance = axios.create({
  baseURL: config.INVENTORY_API_BASE_URL,
  headers: { Accept: "*/*", "Content-Type": "application/json" },
});

export interface GetInventoryResponseBody {
  id: string;
  quantity: number;
  productId: string;
  categoryId: string | null;
}

interface InventoryClient {
  getInventories(): Promise<GetInventoryResponseBody[]>;
  getInventoriesByCategoryId(
    categoryId: string
  ): Promise<GetInventoryResponseBody[]>;
}

const inventoryClient: InventoryClient = {
  getInventories: async () => {
    const response = await instance.get(`/`);
    return response.data?.data;
  },
  getInventoriesByCategoryId: async (categoryId: string) => {
    const response = await instance.get(`/`, {
      params: {
        categoryId,
      },
    });
    return response.data?.data;
  },
};

export default inventoryClient;
