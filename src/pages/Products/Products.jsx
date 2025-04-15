import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import '../../assets/styles/Products.css';
import RangeSlider from './slider';
import Footer from '../../components/Footer';
import default_image from '../../assets/images/default.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import hookemHand from '../../assets/images/hookem.png';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // State management for filters
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [popularityMap, setPopularityMap] = useState({});
  const [votedPosts, setVotedPosts] = useState({}); // key: productId, value: true/false

  const toggleVote = (productId) => {
    setVotedPosts(prev => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };


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
    const minDistance = Math.ceil(0.07 * maxPrice); // Define the minimum distance
  
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
  const applyFilters = (filterData) => {
    // // Get keys for checked locations and map them to expected strings.
    // const selectedKeys = Object.keys(locations).filter(key => locations[key]);
    // const selectedLocations = selectedKeys.map(key => locationMapping[key]);

    const filters = filterData || {
      category,
      priceRange,
      // locations: selectedLocations,
      sortBy: sortOption,
      search: searchQuery,
    };

    fetch('http://127.0.0.1:8000/api/filter-products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem("token") && {
          'Authorization': `Token ${localStorage.getItem("token")}`,
        }),
      },
      body: JSON.stringify(filters),
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

        // Set initial popularity and vote state maps
        const popMap = {};
        const voteMap = {};
        data.forEach(product => {
          popMap[product.id] = product.popularity;
          voteMap[product.id] = product.voted; // only if your backend sends this
        });
        console.log('Popularity Map:', popMap);
        console.log('Vote Map:', voteMap);
        setPopularityMap(popMap);
        setVotedPosts(voteMap);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleVoteToggle = async (productId) => {
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
        setPopularityMap(prev => ({
          ...prev,
          [productId]: data.popularity,
        }));
        setVotedPosts(prev => ({
          ...prev,
          [productId]: data.voted,
        }));
      } else {
        console.error("Error toggling vote:", data.error);
      }
    } catch (err) {
      console.error("Network error toggling vote:", err);
    }
  };
  

  const handleAddPostClick = () => {
    navigate('/add-product')
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/max-price/')
      .then(response => response.json())
      .then(data => {
        const max = Math.ceil(Number(data.max_price) / 100) * 100
        setMaxPrice(max);
        setPriceRange([0, max]); // Update priceRange with the new max price
      })
      .catch(error => console.error('Error fetching max price:', error));
  }, []);

  useEffect(() => {
    const filterData = {
      category,
      priceRange,
      sortBy: sortOption,
      search: searchQuery,
    };
    applyFilters(filterData);
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
                  max={maxPrice}
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

              <div className="filters-divider"></div>

              {/* Apply Filter Button */}
              <div className="apply-filter-container">
                <button className="apply-filter-button" onClick={() => applyFilters()}>
                  Apply Filters
                </button>
              </div>
            </div>
            <div className="make-post-section">
              <button className="make-post-button" onClick={handleAddPostClick}>
                Hook Post
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="product-list-main">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div 
                  className="frame-8" 
                  key={product.id} 
                  onClick={() => navigate(`/product/${product.id}`)} 
                  style={{ 
                    position: "relative",
                    cursor: "pointer", 
                    border: "2px solidrgb(170, 169, 169)", // color of the border
                    width: "250px",
                    height: "400px", 
                    borderRadius: "10px", // Rounded corners
                    padding: "20px",
                    margin: "10px",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", // Optional shadow
                    transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                   onMouseEnter={(e) => e.currentTarget.style.border = "2px solid rgb(238, 126, 106)"} // Changes border color on hover
                   onMouseLeave={(e) => e.currentTarget.style.border = "2px solid rgb(170, 169, 169)"} // Resets border color when mouse leaves
                  > 
                  <button
                    className={`floating-hookem-button ${votedPosts[product.id] ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVoteToggle(product.id);
                    }}
                  >
                    <img
                      src={hookemHand}
                      alt="Hook Em"
                      className="floating-hookem-img"
                    />
                  </button>


                  <div 
                  className="product-image" 
                  style={{ width: "250px", height: "220px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                     <img
                        className="image"
                        alt={product.name}
                        src={product.image || default_image}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
                    />
                    </div>

                  <div className="text-wrapper-12">{product.name}</div>
                  <div className="price">
                    <div className="text-wrapper-11">${product.price}</div>
                  </div>
                  <div className="post-info">
                    <span className="post-date">
                      {new Date(product.created_at).toLocaleDateString()}
                    </span>
                    <span className="popularity">
                      Popularity: {product.popularity}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products-message">No products available.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
