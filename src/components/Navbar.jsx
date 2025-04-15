import React, { useState } from 'react'
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
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
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
    navigate('/Sublease/')
  }


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to the Products page with the search query as a URL parameter.
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid #ddd' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side: Logo and name */}
        <Box display="flex" alignItems="center" onClick={handleIconClick}>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 50,
              margin: 1,
            }}
            alt="carrot icon"
            src={carrot}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: '#da4208' }}
          >
            HORN DEALS
          </Typography>
        </Box>

        {/* Center: Navigation Links */}
        <Box sx={{ display: 'flex', gap: 10 }}>
          <Button
            color="inherit"
            sx={{ color: '#333', fontWeight: 'bold' }}
            onClick={handleProductsClick}
          >
            products
          </Button>
          <Button
            component={Link}
            to="/About"
            color="inherit"
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/Sublease"
            color="inherit"
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            Sublease
          </Button>
        </Box>

        {/* Right side: Search bar and button */}
        <Box display="flex" alignItems="center">
          {/* <form onSubmit={handleSearchSubmit}>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ bgcolor: '#f7f7f7', borderRadius: '5px', mr: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form> */}
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                // e.preventDefault();
                handleSearchSubmit(e)
              }
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
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Profile"
                className="circle"
                onClick={handleProfileClick}
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
