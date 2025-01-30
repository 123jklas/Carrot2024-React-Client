import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import '../../assets/styles/Products.css'
import RangeSlider from './slider'
import Footer from '../../components/Footer'


const Products = () => {

    // State management for filters
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([50, 200]);
    const [locations, setLocations] = useState({
        gregoryGym: false,
        eer: false,
        utTower: false,
        westCampus: false,
    });
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Handler for category selection
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    // Handler for price range change
    
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
      };

    // Handler for location checkbox toggle
    const handleLocationChange = (e) => {
        const { name, checked } = e.target;
        setLocations((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handler for applying filters
    const applyFilters = () => {
        const selectedLocations = Object.keys(locations).filter(
        (key) => locations[key]
        );
    
        const filterData = {
        category,
        priceRange,
        locations: selectedLocations,
        };
    
        // Send filterData to backend
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
            // 'data' is the list of filtered products from the backend
            console.log('Filtered products:', data);
            // Here, you could set some React state to store these products 
            // and render them dynamically instead of the static sample products
            setFilteredProducts(data); // Save returned products in state
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    return(   
        <div className="products-container"> 
            <Navbar/>
            <div className="product-list">
                    <div className="overlap">
                    <div className="filters-container">
                        <div className="filters-section">
                            
                            {/* Top header row (optional icon) */}
                            <div className="filters-header">
                            <h2 className="filters-title">Filters</h2>
                            <span className="filters-icon">
                                {/* Optional filter icon (SVG, font icon, or text) */}
                                <svg width="20" height="20" fill="#888" viewBox="0 0 24 24">
                                <path d="M3 4h18v2H3zm4 7h10v2H7zm2 7h6v2H9z"></path>
                                </svg>
                            </span>
                            </div>
                            
                            {/* Thin divider line */}
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

                            {/* Divider */}
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

                            {/* Divider */}
                            <div className="filters-divider"></div>

                            {/* Location Filter */}
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
                            </div>


                            {/* Divider */}
                            <div className="filters-divider"></div>

                            {/* Apply Filter Button */}
                            <div className="apply-filter-container">
                            <button className="apply-filter-button" onClick={applyFilters}>
                                Apply Filters
                            </button>
                            </div>
                        </div>
                        </div>


                        <div className="product-list-main">
                        {filteredProducts.map(product => (
                            <div className="frame-8" key={product.id}>
                            <div className="product-image">
                                {/* If you store an image URL in 'product.image_url', for example */}
                                <img className="image" alt="Sample product" src={product.image_url} />
                            </div>
                            <div className="text-wrapper-12">{product.name}</div>
                            <div className="price">
                                <div className="text-wrapper-11">${product.price}</div>
                            </div>
                            <div className="text-wrapper-10">{product.location}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

            <Footer/>
        </div>
    )
}

export default Products
