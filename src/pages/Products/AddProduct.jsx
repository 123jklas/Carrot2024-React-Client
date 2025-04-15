import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/ProductService.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Main image
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Additional images (up to 5), each item: { file: File, preview: string }
  const [additionalImages, setAdditionalImages] = useState([]);

  // Refs for hidden file inputs
  const mainImageInputRef = useRef(null);
  const additionalImageInputRef = useRef(null);

  const navigate = useNavigate();

  // Fetch categories from the backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  /* -----------------------------
     MAIN IMAGE HANDLERS
  ------------------------------*/
  const handleMainImageButtonClick = () => {
    // Programmatically click the hidden file input
    if (mainImageInputRef.current) {
      mainImageInputRef.current.click();
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* -----------------------------
     ADDITIONAL IMAGES HANDLERS
  ------------------------------*/
  const handleAdditionalImageButtonClick = () => {
    if (additionalImages.length >= 5) {
      alert('You can only upload up to 5 images.');
      return;
    }
    // Programmatically click the hidden file input
    if (additionalImageInputRef.current) {
      additionalImageInputRef.current.click();
    }
  };

  const handleAdditionalImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // If we already have 5 images, do nothing
    if (additionalImages.length >= 5) {
      alert('You can only upload up to 5 images.');
      return;
    }

    // Add the new image to the state
    const newImageObj = {
      file,
      preview: URL.createObjectURL(file),
    };
    setAdditionalImages([...additionalImages, newImageObj]);

    // Reset the file input so the same file can be chosen again if needed
    if (additionalImageInputRef.current) {
      additionalImageInputRef.current.value = '';
    }
  };

  const removeAdditionalImage = (index) => {
    const updated = [...additionalImages];
    updated.splice(index, 1);
    setAdditionalImages(updated);
  };

  /* -----------------------------
     FORM SUBMISSION
  ------------------------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);

    // Append main image if available
    if (image) {
      formData.append('image', image);
    }

    // Append additional images
    additionalImages.forEach((imgObj) => {
      formData.append('additional_images', imgObj.file);
    });

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://127.0.0.1:8000/products/create/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        navigate('/products');
      } else {
        // Parse the error response JSON and extract messages
      let errorMessage = 'Failed to add product. Please try again.';
      try {
        const errorData = await response.json();
        const errorMessages = [];
        // Loop through each field in the error response
        for (const key in errorData) {
          if (Array.isArray(errorData[key])) {
            errorMessages.push(...errorData[key]);
          } else {
            errorMessages.push(errorData[key]);
          }
        }
        if (errorMessages.length > 0) {
          errorMessage = errorMessages.join(' ');
        }
      } catch (jsonError) {
        console.error('Error parsing error response:', jsonError);
      }
      alert('Error: ' + errorMessage);
      console.error('Failed to add product:', errorMessage);
    }
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-product-container-container">
      <Navbar />
      <div className="add-product-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Post Title */}
          <label htmlFor="title">Post Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Product Name */}
          <label htmlFor="name">Product Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Category */}
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Price */}
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          {/* Main Image */}
          <label htmlFor="image">Main Image:</label>
          <div className="main-image-actions">
            <button
              type="button"
              onClick={handleMainImageButtonClick}
              className="secondary-btn"
            >
              Add Main Image
            </button>
          </div>
          <input
            id="image"
            type="file"
            accept="image/*"
            ref={mainImageInputRef}
            onChange={handleMainImageChange}
            style={{ display: 'none' }} // hidden
          />

          {/* Main Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Main Preview" />
            </div>
          )}

          {/* Additional Images */}
          <label>Additional Images (up to 5):</label>
          <div className="additional-image-actions">
            <button
              type="button"
              onClick={handleAdditionalImageButtonClick}
              className="secondary-btn"
            >
              Add Additional Image
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={additionalImageInputRef}
            onChange={handleAdditionalImageChange}
            style={{ display: 'none' }} // hidden
          />

          {/* Additional Images Preview */}
          {additionalImages.length > 0 && (
            <div className="additional-images-preview">
              {additionalImages.map((imgObj, index) => (
                <div key={index} className="additional-image-container">
                  <img src={imgObj.preview} alt={`Additional ${index + 1}`} />
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => removeAdditionalImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />


          {/* Buttons */}
          <div className="button-container">
            <button type="submit">Submit Product</button>
            <button type="button" onClick={() => navigate('/products')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
