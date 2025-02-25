import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/ProductService.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SettingsPhone } from '@mui/icons-material';


const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [phone,setPhone] = useState('');
    const [category, setCategory] = useState('');
    // getting the categories options that is already set up in backend
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    // Fetch categories from the backend when the component mounts
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/')  // Endpoint to fetch categories
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);  // Set the categories in the state
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('phone', phone);
        formData.append('category', category);
        if (image) formData.append('image', image);

        try {
            const response = await fetch('http://127.0.0.1:8000/products/create/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/products'); // Redirect to the product list after successful submission
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="add-product-container-container">
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
                      Phone:
                      <input
                      
                          type="text"
                          value={phone}
                          onChange={(e) => { const value = e.target.value.replace(/\D/g, "");
                            if(value.length <= 10){
                                setPhone(value);
                            }
                          }}
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
        </div>
        <Footer />
        </div>
    );
};

export default AddProduct;
