import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    const newProduct = await addProduct(formData);
    setProducts([...products, newProduct]);

    // Clear the form
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div>
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductList;
