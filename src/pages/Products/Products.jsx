import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import '../../assets/styles/Products.css';
import RangeSlider from './slider';
import Footer from '../../components/Footer';
import default_image from '../../assets/images/default.png';
import { useNavigate } from 'react-router-dom';
import {
  Button,
} from '@mui/material';

const Products = () => {
  const navigate = useNavigate()

  // State management for filters
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  // // const [locations, setLocations] = useState({
  // //   gregoryGym: false,
  // //   eer: false,
  // //   utTower: false,
  // //   westCampus: false,
  // });
  const [filteredProducts, setFilteredProducts] = useState([]);
  // 정렬 옵션 상태 추가
  const [sortOption, setSortOption] = useState('latest'); // 기본값: 최신순

  // 정렬 기준 변경 핸들러
  const handleSortChange = (e) => {
    setSortOption(e.target.value); 
  };

  // // Mapping from state keys to actual location names
  // const locationMapping = {
  //   gregoryGym: "Gregory Gym",
  //   eer: "EER",
  //   utTower: "UT Tower",
  //   westCampus: "West Campus"
  // };

  // Handler for category selection
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handler for price range change
  const handlePriceChange = (event, newValue) => {
    const minDistance = 35; // Define the minimum distance
  
    // Enforce minimum distance between the two values
    if (newValue[1] - newValue[0] >= minDistance) {
      setPriceRange(newValue);
    } else {
      // Adjust values to maintain the minimum distance
      if (newValue[0] === priceRange[0]) {
        setPriceRange([newValue[0], newValue[0] + minDistance]);
      } else {
        setPriceRange([newValue[1] - minDistance, newValue[1]]);
      }
    }
  };
  

  // Handler for location checkbox toggle
  // const handleLocationChange = (e) => {
  //   const { name, checked } = e.target;
  //   setLocations(prev => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  // };

  // Handler for applying filters
  const applyFilters = () => {
    // // Get keys for checked locations and map them to expected strings.
    // const selectedKeys = Object.keys(locations).filter(key => locations[key]);
    // const selectedLocations = selectedKeys.map(key => locationMapping[key]);

    const filterData = {
      category,
      priceRange,
      // locations: selectedLocations,
      sortBy: sortOption,
    };

    fetch('http://127.0.0.1:8000/api/filter-products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Filtered products:', data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleAddPostClick = () => {
    navigate('/add-product')
  };

  // Fetch all products when the component mounts
  useEffect(() => {
    applyFilters();
  }, []);

  return (
    <div className="products-container">
      <Navbar />
      <div className="product-list">
        <div className="overlap">
          <div className="filters-container">
            <div className="filters-section">
              <div className="filters-header">
                <h2 className="filters-title">Filters</h2>
                <span className="filters-icon">
                  <svg width="20" height="20" fill="#888" viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3zm4 7h10v2H7zm2 7h6v2H9z"></path>
                  </svg>
                </span>
              </div>

              <div className="filters-divider"></div>

              {/* Category Filter */}
              <div className="filter-group">
                <h3 className="filter-title">Category</h3>
                <select
                  className="filter-dropdown"
                  value={category}
                  onChange={handleCategoryChange}
                  aria-label="Select Category"
                >
                  <option value="">All Categories</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="tickets">Tickets</option>
                  <option value="studyMaterials">Study Materials</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div className="filters-divider"></div>

              {/* Price Range Filter */}
              <div className="filter-group">
                <h3 className="filter-title">Price Range</h3>
                <RangeSlider
                  value={priceRange}
                  onChange={handlePriceChange}
                  min={0}
                  max={500}
                />
                <div className="price-values">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div className="filters-divider"></div>

              <div className="filter-group">
                <h3 className="filter-title">Sort By</h3>
                <select className="filter-dropdown" value={sortOption} onChange={handleSortChange}>
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Location Filter
              <div className="filter-group">
                <h3 className="filter-title">Location</h3>
                <div className="locations">
                  <label className="location-label">
                    <input
                      type="checkbox"
                      name="gregoryGym"
                      checked={locations.gregoryGym}
                      onChange={handleLocationChange}
                    />
                    Gregory Gym
                  </label>

                  <label className="location-label">
                    <input
                      type="checkbox"
                      name="eer"
                      checked={locations.eer}
                      onChange={handleLocationChange}
                    />
                    EER
                  </label>

                  <label className="location-label">
                    <input
                      type="checkbox"
                      name="utTower"
                      checked={locations.utTower}
                      onChange={handleLocationChange}
                    />
                    UT Tower
                  </label>

                  <label className="location-label">
                    <input
                      type="checkbox"
                      name="westCampus"
                      checked={locations.westCampus}
                      onChange={handleLocationChange}
                    />
                    West Campus
                  </label>
                </div>
              </div> */}

              <div className="filters-divider"></div>

              {/* Apply Filter Button */}
              <div className="apply-filter-container">
                <button className="apply-filter-button" onClick={applyFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="product-list-main">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div className="frame-8" key={product.id}>
                  <div className="product-image">
                    <img
                      className="image"
                      alt={product.name}
                      src={product.image || default_image} // Provide a fallback if needed
                    />
                  </div>
                  <div className="text-wrapper-12">{product.name}</div>
                  <div className="price">
                    <div className="text-wrapper-11">${product.price}</div>
                  </div>
                  <div className="text-wrapper-10">{product.location}</div>
                </div>
              ))
            ) : (
              <div className="no-products-message">No products available.</div>
            )}
          </div>
          <Button className="make-post-button" onClick={handleAddPostClick}>Make Post</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
