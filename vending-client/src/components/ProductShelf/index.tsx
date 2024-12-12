import React, { useEffect, useState } from "react";
import inventoryClient, {
  GetInventoryResponseBody,
} from "../../libs/inventory-client";
import ProductCard from "../ProductCard";
import { GetProductResponseBody } from "../../libs/product-client";
import "./index.scss";
import categoryClient, {
  GetCategoryResponseBody,
} from "../../libs/category-client";
import { Radio, Tag } from "antd";

interface ProductShelfProps {
  setInterestProduct: React.Dispatch<
    React.SetStateAction<GetProductResponseBody | undefined>
  >;
}

const ProductShelf: React.FC<ProductShelfProps> = ({ setInterestProduct }) => {
  const [inventories, setInventories] = useState<GetInventoryResponseBody[]>();
  const [categories, setCategories] = useState<GetCategoryResponseBody[]>();
  const [subCategories, setSubCategories] =
    useState<GetCategoryResponseBody[]>();
  const [allowCategory, setAllowCategory] = useState<string[]>([]);

  const [mainCategory, setMainCategory] = useState("all");
  const mainCategories = categories?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const [selectedSubCategory, setSelectedSubCategory] = useState<string[]>([]);

  const fetchInventories = async () => {
    const data = await inventoryClient.getInventories();
    setInventories(data);
  };

  const fetchCategories = async () => {
    const data = await categoryClient.getCategories();
    setCategories(data);
  };

  const fetchSubCategories = async (categoryId: string) => {
    const data = await categoryClient.getSubCategories(categoryId);
    setAllowCategory([
      categoryId,
      ...data.map((subCategory) => subCategory.id),
    ]);
    setSubCategories(data);
  };

  const handleChangeMainCategory = (e: any) => {
    setMainCategory(e.target.value);
  };

  const handleChangeSubCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubCategory([...selectedSubCategory, categoryId]);
    } else {
      setSelectedSubCategory(
        selectedSubCategory.filter((id) => id !== categoryId)
      );
    }
  }

  useEffect(() => {
    fetchInventories();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (mainCategory === "all") {
      setAllowCategory([]);
      setSubCategories([]);
      setSelectedSubCategory([]);
    } else {
      setSubCategories([]);
      setSelectedSubCategory([]);
      fetchSubCategories(mainCategory);
    }
  }, [mainCategory]);

  useEffect(() => {
    if (mainCategory !== "all") {
      if (selectedSubCategory.length === 0) {
        setAllowCategory([mainCategory, ...subCategories?.map((category) => category.id) ?? []]);
      } else {
        setAllowCategory(selectedSubCategory);
      }
    }
  }, [selectedSubCategory]);

  console.log(allowCategory);

  return (
    <>
      <div className="shelf-filter-bar">
        <Radio.Group
          options={[{ label: "All", value: "all" }, ...(mainCategories ?? [])]}
          onChange={handleChangeMainCategory}
          value={mainCategory}
          optionType="button"
          buttonStyle="solid"
        />
        <div className="sub-category-tag">
          {subCategories &&
            subCategories.length > 0 &&
            subCategories.map<React.ReactNode>((category) => (
              <Tag.CheckableTag
                key={category.id}
                checked={selectedSubCategory.includes(category.id)}
                onChange={(checked) => handleChangeSubCategory(category.id, checked)}
              >
                {category.name}
              </Tag.CheckableTag>
            ))}
        </div>
      </div>
      <div className="shelf-container">
        {inventories &&
          inventories.map((inventory) => {
            const productCard = (
              <ProductCard
                key={inventory.productId}
                productId={inventory.productId}
                setInterest={setInterestProduct}
                isProductOutOfStock={inventory.quantity <= 0}
              />
            );

            if (
              allowCategory.length === 0 ||
              allowCategory.includes(inventory.categoryId ?? "")
            ) {
              return productCard;
            }
          })}
      </div>
    </>
  );
};

export default ProductShelf;
