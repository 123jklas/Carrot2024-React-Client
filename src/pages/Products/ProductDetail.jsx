import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import '../../assets/styles/Post.css';
import defaultImage from '../../assets/images/default.png';

const ProductDetail = () => {
    const { productId } = useParams(); // Get product ID from URL params
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/product/${productId}/`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product detail:', error));
    }, [productId]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/products/${productId}/related/`)
            .then(response => response.json())
            .then(data => setRelatedProducts(data))
            .catch(error => console.error('Error fetching related products:', error));
    }, [productId]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-detail-container">
            <Navbar />
            <div className="product-detail">
                <div className="product-detail__image-container">
                    <img 
                        src={product.image ? (product.image.startsWith("http") ? product.image : `http://127.0.0.1:8000${product.image}`) : defaultImage} 
                        alt={product.title} 
                        className="product-detail__image"
                    />
                </div>
                <div className="product-detail__info">
                    <h1 className="product-detail__title">{product.title}</h1>
                    <span className="product-detail__meta">
                        <span className="product-detail__date">{new Date(product.created_at).toLocaleDateString()}</span> |
                        <span className="product-detail__category">{product.category}</span>
                    </span>
                    <p className="product-detail__price">${product.price}</p>
                    <p className="product-detail__description">{product.content}</p>
                    <p className="product-detail__location">Location: {product.location}</p>
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
                                            src={relatedProduct.image ? (relatedProduct.image.startsWith("http") ? relatedProduct.image : `http://127.0.0.1:8000${relatedProduct.image}`) : defaultImage} 
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
                    <button className="product-detail__add-to-cart">Add to Cart</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
