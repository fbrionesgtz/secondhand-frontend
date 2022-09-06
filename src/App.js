import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useHttp from "./hooks/use-http";
import ShopPage from "./pages/ShopPage";
import EditProductPage from "./pages/EditProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";

function App() {
  const [products, setProducts] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const transformProducts = (products) => {
      const transformedProducts = [];
      for (const key in products["products"]) {
        transformedProducts.push({
          _id: products["products"][key]._id,
          title: products["products"][key].title,
          price: products["products"][key].price,
          description: products["products"][key].description,
          image: products["products"][key].image,
        });
      }

      setProducts(transformedProducts);
    };

    sendRequest({ url: "http://localhost:8080/products" }, transformProducts);
  }, [sendRequest]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop/:productId" element={<ProductDetailsPage />} />
      <Route path="/shop" element={<ShopPage products={products} />} />
      <Route path="/add-product" element={<EditProductPage />} />
      <Route path="/update-product/:productId" element={<EditProductPage />} />
    </Routes>
  );
}

export default App;
