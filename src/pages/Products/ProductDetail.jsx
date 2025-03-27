import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import '../../assets/styles/Post.css'
import defaultImage from '../../assets/images/default.png'

const ProductDetail = () => {
  const { productId } = useParams() // Get product ID from URL params
  const [product, setProduct] = useState(null)
  const [mainImage, setMainImage] = useState(null) // State for main image
  const [relatedProducts, setRelatedProducts] = useState([])
  const [popularity, setPopularity] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const isAuthenticated = !!localStorage.getItem('token')

  // Fetch product details
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/product/${productId}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched product data:', data)
        setProduct(data)
        setPopularity(data.popularity)
        setHasVoted(data.voted)
      })
      .catch(error => console.error('Error fetching product detail:', error))
  }, [productId])

  // When product data is loaded, initialize the main image to the product image
  useEffect(() => {
    if (product) {
      setMainImage(product.image)
    }
  }, [product])

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
        },
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
      <div className="product-detail">
        <div className="product-detail__image-container">
          <img
            src={getImageUrl(mainImage)}
            alt={product.title}
            className="product-detail__image"
            // Optional: clicking the main image resets it to the product's original image
            onClick={() => setMainImage(product.image)}
          />
        </div>
        {/* Additional Images List */}
        <div className="product-detail__additional-images">
          {/* Show the original image as the first thumbnail */}
          <img
            key="original"
            src={getImageUrl(product.image)}
            alt="Original"
            className="product-detail__additional-image"
            onClick={() => setMainImage(product.image)}
          />
          {/* Map over additional images (if any) */}
          {product.additional_images && product.additional_images.length > 0 && 
            product.additional_images.map((img, index) => (
              <img
                key={index}
                src={getImageUrl(img.image)}
                alt={`Additional ${index + 1}`}
                className="product-detail__additional-image"
                onClick={() => setMainImage(img.image)}
              />
            ))
          }
        </div>
        <div className="product-detail__info">
          <h1 className="product-detail__title">{product.title}</h1>
          <span className="product-detail__meta">
            <span className="product-detail__date">
              {new Date(product.created_at).toLocaleDateString()}
            </span>{' '}
            |
            <span className="product-detail__category">{product.category}</span>
          </span>
          <p className="product-detail__price">${product.price}</p>
          <p className="product-detail__description">{product.content}</p>
          <p className="product-detail__location">
            Location: {product.location}
          </p>
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-products__list">
              {relatedProducts.length > 0 ? (
                relatedProducts.map(relatedProduct => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="related-product-item"
                    onClick={scrollToTop}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <img
                      src={getImageUrl(relatedProduct.image)}
                      alt={relatedProduct.title}
                      className="related-product-image"
                    />
                    <h3>{relatedProduct.title}</h3>
                    <p>${relatedProduct.price}</p>
                  </Link>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          </div>
          <button
            className={`product-detail__add-to-cart ${hasVoted ? 'voted' : ''}`}
            onClick={handleSubmit}
          >
            {hasVoted ? 'Hook Down' : 'Hook Up'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail
