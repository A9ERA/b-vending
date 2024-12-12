import axios from 'axios';
import { config } from '../config';

const instance = axios.create({
  baseURL: config.CATEGORY_API_BASE_URL,
  headers: { Accept: '*/*', 'Content-Type': 'application/json' },
});

export interface GetCategoryResponseBody {
  id: string;
  name: string;
  parentId: string | null;
}

interface CategoryClient {
  getCategoryById(categoryId: string): Promise<GetCategoryResponseBody>;
  getCategories(): Promise<GetCategoryResponseBody[]>;
  getSubCategories(categoryId: string): Promise<GetCategoryResponseBody[]>;
};

const categoryClient: CategoryClient = {
    getCategoryById: async (categoryId: string) => {
        const response = await instance.get(`/${categoryId}`);
        return response.data?.data;
    },
    getCategories: async () => {
        const response = await instance.get(`/`);
        return response.data?.data;
    },
    getSubCategories: async (categoryId: string) => {
        const response = await instance.get(`/`, {
            params: {
                parentId: categoryId,
            },
        });
        return response.data?.data;
    },
}

export default categoryClient;
