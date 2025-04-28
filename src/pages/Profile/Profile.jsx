// Profile.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import '../../assets/styles/Profile.css';
import default_image from '../../assets/images/default.png';
import profile_default from '../../assets/images/profile_default.jpg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState('products');
  const [formData, setFormData] = useState({ username: '', email: '', first_name: '', last_name: '', image: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Token ${token}` } };
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', config);
        
        const data = response.data || {};
        setUser(data.user || {});
        setProducts(data.products || []);
        setFavorites(data.favorites || []);

        setFormData({
          username: data.user?.username || '',
          email: data.user?.email || '',
          first_name: data.user?.first_name || '',
          last_name: data.user?.last_name || '',
          image: null,
        });
      } catch (err) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      }
      const response = await axios.put('http://127.0.0.1:8000/api/profile/', formDataToSend, config);
      setUser(response.data.user || {});
      setIsEditing(false);
      window.location.reload(); // reload to show new image immediately
    } catch (err) {
      setError('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home/');
  };

  if (loading) {
    return (
      <div className="profile-container">
        <Navbar />
        <p>Loading...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-layout">
      <Navbar />
      <div className="content-wrapper">
        <aside className="sidebar">
          <img
            src={user.profile_image || user.image || profile_default}
            alt="Profile"
            className="profile-pic"
          />
          <h2 className="username">{user.username || 'Username'}</h2>
          <a className="email" href={`mailto:${user.email}`}>{user.email}</a>

          <div className="button-group">
            <Button variant="contained" color="warning" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button variant="contained" color="error" onClick={handleLogout}>Sign Out</Button>
          </div>

          <nav className="sidebar-nav">
            <p className={viewMode === 'products' ? 'active' : ''} onClick={() => setViewMode('products')}>My Products</p>
            <p className={viewMode === 'favorites' ? 'active' : ''} onClick={() => setViewMode('favorites')}>My Hooked Products</p>
          </nav>
        </aside>

        <main className="main-content">
          {error && <p className="error">{error}</p>}

          {isEditing && (
            <form onSubmit={handleUpdate} className="edit-form" style={{ maxWidth: "30rem", width: "90%", margin: "0 auto" }}>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                style={{ width: "100%", marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.5rem" }}
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                style={{ width: "100%", marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.5rem" }}
              />
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                style={{ width: "100%", marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.5rem" }}
              />
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                style={{ width: "100%", marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.5rem" }}
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1.5rem" }}
              />
              <Button variant="contained" type="submit" sx={{ width: '100%', mb: 1 }}>Save</Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)} sx={{ width: '100%' }}>Cancel</Button>
            </form>          
          )}

          {viewMode === 'products' && products.length > 0 && (
            <>
              <h2 className="section-title center-title">My Products</h2>
              <div className="product-grid center-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                    <img className="product-img" src={product.image || default_image} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p className="price">${product.price}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {viewMode === 'favorites' && favorites.length > 0 && (
            <>
              <h2 className="section-title center-title">My Hooked Products</h2>
              <div className="product-grid center-grid">
                {favorites.map((fav) => (
                  <div key={fav.id} className="product-card" onClick={() => navigate(`/product/${fav.id}`)}>
                    <img className="product-img" src={fav.image || default_image} alt={fav.name} />
                    <h4>{fav.title}</h4>
                    <p className="price">${fav.price}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;