import React from 'react';
import Navbar from '../../components/Navbar'; 
import '../../assets/styles/Post.css'; 
import otherProd from '../../assets/images/otherProd.png';
import product from '../../assets/images/product.png';
import userProf from '../../assets/images/userProf.png';


const ProductDetail = () => {
  return (
    <div className="product-detail">
      <div className="product-detail__image-container">
        <img src={product} alt="Product Image" className="product-detail__image" />
      </div>
      <div className="product-detail__info">
        
        {/* Box containing title */}
        <div className="product-detail__box">
          <h1 className="product-detail__title">Skateboarding pochacco doll </h1>
        </div>
        
        {/* Meta Information: Date of Post and Post Category */}
        <span className="product-detail__meta">
          <span className="product-detail__date">January 26, 2025</span> |
          <span className="product-detail__category">Other</span>
        </span>

        <p className="product-detail__price">$5.99 </p>

        {/* Box containing user profile and description */}
        <div className="product-detail__box">
          <p className="user-profile">
            <img src={userProf} alt="Product Image" className="product-detail__user" />
            <p className="product-detail__username"> Chaetae </p>
          </p>
          <p className="product-detail__description">
            Finding a new owner for Pochacco! <br />
            It's a limited edition pochacco doll, skateboarding version. <br />
            She’s hella cute so please adopt!  <br />
            Contact: 000-000-0000  <br />
            <span className="product-detail__stats">
              <span className="product-detail__likes">Likes: 250</span> |
              <span className="product-detail__views"> Views: 1.2K</span>
            </span>
          </p>
        </div>
        
        <button className="product-detail__add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

const RelatedProducts = () => {
  return (
    <section className="related-products">
      <h2 className="related-products__title">Related Products</h2>
      
      {/* Line separator for related products */}
      <hr className="related-products__line" />
      
      <div className="related-products__list">
        <div className="related-products__item">
          <img src={otherProd} alt="Related Product 1" className="related-products__image" />
          <p className="related-products__name">Scarf pochacco</p>
          <p className="related-products__price">$13.90</p>
        </div>
        <div className="related-products__item">
          <img src={otherProd} alt="Related Product 2" className="related-products__image" />
          <p className="related-products__name">Scarf pochacco</p>
          <p className="related-products__price">$13.90</p>
        </div>
        <div className="related-products__item">
          <img src={otherProd} alt="Related Product 3" className="related-products__image" />
          <p className="related-products__name">Scarf pochacco</p>
          <p className="related-products__price">$13.90</p>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <ProductDetail />
      <RelatedProducts />
    </div>
  );
};

export default App;