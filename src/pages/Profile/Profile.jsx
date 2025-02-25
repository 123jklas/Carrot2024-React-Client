import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import '../../assets/styles/Profile.css';
import { Button } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch profile info when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Token ${token}` } };
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', config);
        // Assume the response contains "user" and "products"
        setUser(response.data.user);
        setProducts(response.data.products);
        setFormData({
          username: response.data.user.username,
          email: response.data.user.email,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
        });
      } catch (err) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the updated profile data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };
      const response = await axios.put('/api/profile/', formData, config);
      // Assume updated user info is returned as "user"
      setUser(response.data.user);
      setIsEditing(false);
    } catch (err) {
      setError('Error updating profile');
    }
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
    <div className="profile-container">
      <Navbar />
      <h1>Profile Page</h1>
      {error && <p className="error">{error}</p>}

      <div className="profile-info">
        {isEditing ? (
          <form onSubmit={handleUpdate} className="profile-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-buttons">
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button variant="outlined" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>First Name:</strong> {user.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {user.last_name}
            </p>
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        )}
      </div>

      <div className="profile-products">
        <h2>Your Products</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <h3>{product.title}</h3>
                <p>{product.name}</p>
                <p>${product.price}</p>
                <p>{product.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't uploaded any products yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
