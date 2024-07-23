import React from "react";
import { deleteProduct } from "../services/productService";

const ProductList = ({ products, onProductDeleted }) => {
  const handleDelete = async (id) => {
    await deleteProduct(id);
    onProductDeleted(id);
  };

  return (
    <div className="list">
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <br />
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              width="100"
            />
            <br />
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
