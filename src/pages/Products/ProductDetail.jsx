import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/Post.css';
import defaultImage from '../../assets/images/default.png';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null); // State for main image display
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [popularity, setPopularity] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isAuthenticated = !!localStorage.getItem("token");

  // Example placeholders for phone, seller name, and views
  const [phone, setPhone] = useState('000-000-0000');
  const [sellerName, setSellerName] = useState('ChaeTae');
  const [views, setViews] = useState(373);

  // Fetch logged-in user from custom backend endpoint
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No authentication token found, skipping user fetch.");
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/", {
          method: "GET",
          headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.error(`User fetch failed: ${response.status} ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setLoggedInUser(data.username);
      } catch (error) {
        console.error("Network error fetching logged-in user:", error);
      }
    };
    fetchUser();
  }, []);

  // Fetch product details
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/product/${productId}/`, {
      headers: token ? { "Authorization": `Token ${token}` } : {},
    })
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setPopularity(data.popularity);
        setHasVoted(data.voted);
        // Set the main image once the product data is loaded
        setMainImage(data.image);
        // Uncomment these if your API provides additional data
        // setPhone(data.phone);
        setSellerName(data.seller_name);
        setViews(data.views);
      })
      .catch(error => console.error("Error fetching product detail:", error));
  }, [productId]);

  // Fetch related products
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${productId}/related/`)
      .then(response => response.json())
      .then(data => setRelatedProducts(data))
      .catch(error => console.error("Error fetching related products:", error));
  }, [productId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to delete a product.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://127.0.0.1:8000/products/delete/${productId}/`, { 
        method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Deleting product failed:", response.status, errorText);
            throw new Error("Failed to delete product");
          }
          const text = await response.text();
          const data = text ? JSON.parse(text) : {};
          alert(data.message || "Product deleted successfully.");
          navigate("/products");
        })
        .catch(error => console.error("Error:", error));
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert('Please log in to vote!');
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/toggle-popularity/${productId}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPopularity(data.popularity);
        setHasVoted(data.voted);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  // Helper function to get the proper image URL
  const getImageUrl = (img) => {
    if (!img) return defaultImage;
    return img.startsWith('http') ? img : `http://127.0.0.1:8000${img}`;
  };

  return (
    <div className="product-detail-container-container">
      <div className="product-detail-container">
        <Navbar />

        {/* Main content area */}
        <div className="product-detail-content">
          {/* LEFT: Images column (main image + additional images) */}
          <div className="image-column">
            <div className="image-section">
              <img
                src={getImageUrl(mainImage)}
                alt={product.title}
                className="main-product-image"
                onClick={() => setMainImage(product.image)}
              />
              {product.additional_images && product.additional_images.length > 0 && (
                <div className="vertical-additional-images">
                  <img
                    key="original"
                    src={getImageUrl(product.image)}
                    alt="Original"
                    className="additional-image"
                    onClick={() => setMainImage(product.image)}
                  />
                  {product.additional_images.map((img, index) => (
                    <img
                      key={index}
                      src={getImageUrl(img.image)}
                      alt={`Additional ${index + 1}`}
                      className="additional-image"
                      onClick={() => setMainImage(img.image)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Seller info, product details, Hook Up button */}
          <div className="info-column">
            <div className="seller-info">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Seller Avatar"
                className="seller-avatar"
              />
              <div className="seller-name">{sellerName}</div>
            </div>

            {/* Container for title and delete button with inline styles */}
            <div
              className="title-and-delete"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <h1 className="selling-title" style={{ margin: 0 }}>
                Selling {product.title}
              </h1>
              {loggedInUser && product.user && loggedInUser === product.user && (
                <button
                  className="product-detail__delete"
                  style={{ marginLeft: 'auto', padding: '10px 20px' }}
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              )}
            </div>

            <div className="product-price">${product.price}</div>
            <div className="product-phone">{phone}</div>

            <div className="beige-box">
              <p className="product-description">{product.content}</p>
              <div className="product-stats">
                <span>{views} Views</span>
                <span>{popularity} Likes</span>
              </div>
            </div>

            <button className="hook-up-button" onClick={handleSubmit}>
              {hasVoted ? 'Hook Down' : 'Hook Up'}
            </button>
          </div>
        </div>

        {/* Related products section */}
        <div className="related-products-section">
          <h2>Products related to this item:</h2>
          <div className="orange-divider"></div>
          <div className="related-products-grid">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="related-product-card"
                  onClick={scrollToTop}
                >
                  <img
                    src={
                      relatedProduct.image
                        ? relatedProduct.image.startsWith('http')
                          ? relatedProduct.image
                          : `http://127.0.0.1:8000${relatedProduct.image}`
                        : defaultImage
                    }
                    alt={relatedProduct.title}
                    className="related-product-image"
                  />
                  <div className="related-product-title">
                    {relatedProduct.title}
                  </div>
                  <div className="related-product-price">
                    ${relatedProduct.price}
                  </div>
                </Link>
              ))
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
