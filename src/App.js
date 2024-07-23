import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { getProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleProductDeleted = (deletedProductId) => {
    setProducts(products.filter((product) => product._id !== deletedProductId));
  };

  return (
    <div className="App">
      <div className="form">
        <ProductForm onProductAdded={handleProductAdded} />
      </div>
      <div className="list">
        <ProductList
          products={products}
          onProductDeleted={handleProductDeleted}
        />
      </div>
    </div>
  );
}

export default App;
