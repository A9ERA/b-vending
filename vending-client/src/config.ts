
export const config = {
    CATEGORY_API_BASE_URL: `${import.meta.env.VITE_VENDING_SERVICE_URL}/api/v1/category`,
    INVENTORY_API_BASE_URL: `${import.meta.env.VITE_VENDING_SERVICE_URL}/api/v1/inventory`,
    PRODUCT_API_BASE_URL: `${import.meta.env.VITE_VENDING_SERVICE_URL}/api/v1/product`,
    MEDIA_API_BASE_URL: `${import.meta.env.VITE_VENDING_SERVICE_URL}/api/v1/media`,
    PAYMENT_API_BASE_URL: `${import.meta.env.VITE_VENDING_SERVICE_URL}/api/v1/payment`,

    MACHINE_NAME: import.meta.env.VITE_VENDING_MACHINE_NAME || "Blue Vending",
    MACHINE_DESCRIPTION: import.meta.env.VITE_VENDING_MACHINE_DESCRIPTION || "A Simple Vending Machine for SMEs",
}
