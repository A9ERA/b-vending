import { useEffect, useState } from "react";
import "./App.css";
import ProductShelf from "./components/ProductShelf";
import ProductPaymentDrawer from "./components/ProductPaymentDrawer";
import { GetProductResponseBody } from "./libs/product-client";
import Header from "./components/Header";

function App() {
  const [interesToBuyProduct, setInteresToBuyProduct] = useState<GetProductResponseBody>();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (interesToBuyProduct) {
      setIsDrawerOpen(true);
    }
  }, [interesToBuyProduct]);

  return (
    <>
      <Header />
      <ProductShelf setInterestProduct={setInteresToBuyProduct} />
      <ProductPaymentDrawer
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setInteresToBuyProduct(undefined);
        }}
        interesProduct={interesToBuyProduct}
      />
    </>
  );
}

export default App;
