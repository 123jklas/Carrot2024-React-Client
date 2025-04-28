import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import carrot from '../assets/images/carrot.png'
import axios from 'axios'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [profileImage, setProfileImage] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const config = { headers: { Authorization: `Token ${token}` } }
          const response = await axios.get('http://127.0.0.1:8000/api/profile/', config)
          const user = response.data.user
          setProfileImage(user.image)
        }
      } catch (error) {
        console.error('Failed to load profile image', error)
      }
    }
    fetchProfile()
  }, [])

  const handleProfileClick = () => {
    navigate('/profile/')
  }

  const handleIconClick = () => {
    navigate('/home/')
  }

  const handleProductsClick = () => {
    navigate('/products/')
  }

  const handleAboutClick = () => {
    navigate('/About/')
  }

  const handleSubleaseClick = () => {
    navigate('/products?category=sublease')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #ddd' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" onClick={handleIconClick}>
          <Box
            component="img"
            sx={{ height: 50, width: 50, margin: 1 }}
            alt="carrot icon"
            src={carrot}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#da4208' }}>
            HORN DEALS
          </Typography>
        </Box>

        {/* Center Links */}
        <Box sx={{ display: 'flex', gap: 10 }}>
          <Button color="inherit" sx={{ color: '#333', fontWeight: 'bold' }} onClick={handleProductsClick}>
            products
          </Button>
          <Button color="inherit" sx={{ color: '#333', fontWeight: 'bold' }} onClick={handleAboutClick}>
            About
          </Button>
          <Button color="inherit" sx={{ color: '#333', fontWeight: 'bold' }} onClick={handleSubleaseClick}>
            Sublease
          </Button>
        </Box>

        {/* Right side: Search and Profile */}
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit(e)
            }}
            sx={{ bgcolor: '#f7f7f7', borderRadius: '5px', mr: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <div>
            {localStorage.getItem('token') ? (
              <img
                src={profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="Profile"
                className="circle"
                onClick={handleProfileClick}
                style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', objectFit: 'cover' }}
              />
            ) : (
              <Button onClick={() => navigate('/')} variant="contained">
                Login
              </Button>
            )}
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar