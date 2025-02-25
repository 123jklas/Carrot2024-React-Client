import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import '../../assets/styles/Post.css';

const ProductDetail = () => {
    const { productId } = useParams(); // Get product ID from URL params
    const [product, setProduct] = useState(null);
    const [popularity, setPopularity] = useState(0);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/product/${productId}/`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched product data:", data);
                setProduct(data)
            })
            .catch(error => console.error('Error fetching product detail:', error));
    }, [productId]);
    console.log(productId)

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/increase-popularity/${productId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.ok) {
                setPopularity(data.popularity); // Update UI with new popularity count
            } else {
                console.error("Error:", data.error);
            }
        } catch (error) {
            console.error("Request failed", error);
        }
    };

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-detail-container">
            <Navbar />
            <div className="product-detail">
                <div className="product-detail__image-container">
                    <img src={product.image.startsWith("http") ? product.image : `http://127.0.0.1:8000${product.image}`} alt={product.name} className="product-detail__image" />
                </div>
                <div className="product-detail__info">
                    <div className="product-detail__box">
                        <h1 className="product-detail__title">{product.title}</h1>
                    </div>
                    <span className="product-detail__meta">
                        <span className="product-detail__date">{new Date(product.created_at).toLocaleDateString()}</span> |
                        <span className="product-detail__category">{product.category}</span>
                    </span>
                    <p className="product-detail__price">${product.price}</p>
                    <div className="product-detail__box">
                        <p className="product-detail__description">{product.content}</p>
                        <p className="product-detail__location">Location: {product.location}</p>
                        <p className="product-detail__popularity">Popularity: {product.popularity}</p>
                    </div>
                    <button className="product-detail__add-to-cart" onClick={handleSubmit}>Hook Em</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
