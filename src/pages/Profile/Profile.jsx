// Profile.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import '../../assets/styles/Profile.css';
import default_image from '../../assets/images/default.png';
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
        setUser(response.data.user);
        setProducts(response.data.products);
        setFavorites(response.data.favorites);
        setFormData({
          username: response.data.user.username,
          email: response.data.user.email,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          image: null
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
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
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
      setUser(response.data.user);
      setIsEditing(false);
    } catch (err) {
      setError('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home/');
  };

  if (loading) return <div className="profile-container"><Navbar /><p>Loading...</p><Footer /></div>;

  return (
    <div className="profile-layout">
      <Navbar />
      <div className="content-wrapper">
        <aside className="sidebar">
          <img src={user.image || default_image} alt="Profile" className="profile-pic" />
          <h2 className="username">{user.username}</h2>
          <a className="email" href={`mailto:${user.email}`}>{user.email}</a>
          <div className="button-group">
            <Button variant="contained" color="warning" className="edit-btn" onClick={() => setIsEditing(true)}> Edit </Button>
            <Button variant="contained" color="error" className="logout-btn" onClick={handleLogout}> Sign Out </Button>
          </div>
          <nav className="sidebar-nav">
            <p className={viewMode === 'products' ? 'active' : ''} onClick={() => setViewMode('products')}>My Products</p>
            <p className={viewMode === 'favorites' ? 'active' : ''} onClick={() => setViewMode('favorites')}>My Hooked Products</p>
          </nav>
        </aside>

        <main className="main-content">
          {error && <p className="error">{error}</p>}

          {isEditing && (
            <form onSubmit={handleUpdate} className="edit-form">
              <input name="username" value={formData.username} onChange={handleChange} />
              <input name="email" value={formData.email} onChange={handleChange} />
              <input name="first_name" value={formData.first_name} onChange={handleChange} />
              <input name="last_name" value={formData.last_name} onChange={handleChange} />
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
              <Button variant="contained" type="submit">Save</Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
          )}

          {viewMode === 'products' && (
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

          {viewMode === 'favorites' && (
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