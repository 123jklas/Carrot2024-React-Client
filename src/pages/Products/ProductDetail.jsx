import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import '../../assets/styles/Post.css'
import defaultImage from '../../assets/images/default.png'

const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState(null) // State for main image display
  const [relatedProducts, setRelatedProducts] = useState([])
  const [popularity, setPopularity] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const isAuthenticated = !!localStorage.getItem('token')

  // Example placeholders for phone, seller name, and views
  const [phone, setPhone] = useState('000-000-0000')
  const [sellerName, setSellerName] = useState('ChaeTae')
  const [views, setViews] = useState(373)

  // Fetch product details
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/product/${productId}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setProduct(data)
        setPopularity(data.popularity)
        setHasVoted(data.voted)
        // Set the main image once the product data is loaded
        setMainImage(data.image)
        // Uncomment these if your API provides additional data
        // setPhone(data.phone)
        // setSellerName(data.seller_name)
        // setViews(data.views)
      })
      .catch(error => console.error('Error fetching product detail:', error))
  }, [productId])

  // Fetch related products
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${productId}/related/`)
      .then(response => response.json())
      .then(data => setRelatedProducts(data))
      .catch(error => console.error('Error fetching related products:', error))
  }, [productId])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert('Please log in to vote!')
      return
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
      )

      const data = await response.json()
      if (response.ok) {
        setPopularity(data.popularity)
        setHasVoted(data.voted)
      } else {
        console.error('Error:', data.error)
      }
    } catch (error) {
      console.error('Request failed', error)
    }
  }

  if (!product) {
    return <p>Loading product details...</p>
  }

  // Helper function to get the proper image URL
  const getImageUrl = (img) => {
    if (!img) return defaultImage
    return img.startsWith('http') ? img : `http://127.0.0.1:8000${img}`
  }

  return (
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
              // Optional: clicking the main image resets it to the original product image
              onClick={() => setMainImage(product.image)}
            />

            {product.additional_images && product.additional_images.length > 0 && (
              <div className="vertical-additional-images">
                {/* Optional: display the original image as a thumbnail */}
                <img
                  key="original"
                  src={getImageUrl(product.image)}
                  alt="Original"
                  className="additional-image"
                  onClick={() => setMainImage(product.image)}
                />
                {/* Map over additional images */}
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
              src="https://via.placeholder.com/50x50.png?text=S"
              alt="Seller Avatar"
              className="seller-avatar"
            />
            <div className="seller-name">{sellerName}</div>
          </div>

          <h1 className="selling-title">Selling {product.title}</h1>
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

      <Footer />
    </div>
  )
}

export default ProductDetail
