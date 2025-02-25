import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/ProductService.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const ProductDetail = () => {

    return (
        <div className="add-product-container">
          <Navbar />
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="titleBox">
                    Post Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <div className="input-grid">
                  <label>
                      Product Name:
                      <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                  </label>
                  <label>
                      Price:
                      <input
                          type="number"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                      />
                  </label>
                  <label>
                      Location:
                      <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                      />
                  </label>
                  <label>
                        Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="">Select a category</option>
                            {/* Render the fetched categories dynamically */}
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </label>
                  <label>
                      Image:
                      <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                      />
                  </label>
                </div>
                <label htmlFor="content">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}                    />
                </label>
                <div className="button-container">
                  <button type="submit">Submit Product</button>
                  <button onClick={() => navigate('/products')}>Cancel</button>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default AddProduct;
