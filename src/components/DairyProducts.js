import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './DairyProducts.module.css';

const DairyProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add a new product
  const addProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: 0, quantity: 0, description: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Update a product
  const updateProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/products/${editingProduct._id}`, editingProduct);
      setProducts(products.map((product) => (product._id === editingProduct._id ? response.data : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={style.container}>
      <h1>Dairy Products</h1>

      {/* Add Product Section */}
      <h2>Add New Product</h2>
      <div className={style.formContainer}>
        <label>
          Name:
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
          />
        </label>
        <label>
          Description:
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          ></textarea>
        </label>
        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* Products Table */}
      <h2>Product List</h2>
      <table className={style.productTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => setEditingProduct(product)} className={style.editButton}>
                  Update
                </button>
                <button onClick={() => deleteProduct(product._id)} className={style.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Overlay for Editing Product */}
      {editingProduct && (
        <div className={style.overlay}>
          <div className={style.overlayContent}>
            <h2>Edit Product</h2>
            <label>
              Name:
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={editingProduct.quantity}
                onChange={(e) => setEditingProduct({ ...editingProduct, quantity: Number(e.target.value) })}
              />
            </label>
            <label>
              Description:
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              ></textarea>
            </label>
            <button onClick={updateProduct} className={style.saveButton}>
              Update
            </button>
            <button onClick={() => setEditingProduct(null)} className={style.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DairyProducts;
