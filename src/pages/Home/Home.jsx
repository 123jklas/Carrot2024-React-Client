import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Icon,
  Grid,
} from '@mui/material';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import mapImg from '../../assets/images/map.png';
import placeholderImg from '../../assets/images/pochako.png';

const Home = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);

  const nextHero = () => setHeroIndex((prev) => (prev + 1) % 2);
  const prevHero = () => setHeroIndex((prev) => (prev - 1 + 2) % 2);

  useEffect(() => {
    const interval = setInterval(() => nextHero(), 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: 'Clothing', icon: 'checkroom' },
    { name: 'Accessories', icon: 'watch' },
    { name: 'Tickets', icon: 'confirmation_number' },
    { name: 'Study Material', icon: 'menu_book' },
    { name: 'Miscellaneous', icon: 'category' },
    { name: 'Sublease', icon: 'bedroom_parent' }, 
  ];

  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/top-liked-products/')
      .then(res => res.json())
      .then(data => {
        setLikedProducts(data);
      })
      .catch(err => {
        console.error('Failed to load top liked products', err);
      });
  }, []);

  return (
    <Box sx={{ backgroundColor: '#FFFDE7' }}>
      <Navbar />

      {/* Hero Carousel */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: '100vw',
          minHeight: '70vh',
          pt: { xs: '56px', sm: '64px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '200vw',
            transform: `translateX(-${heroIndex * 100}vw)`,
            transition: 'transform 0.6s ease-in-out',
          }}
        >
      {/* Slide 1 */}
      <Box
        sx={{
          width: '100vw',
          flexShrink: 0,
          backgroundColor: '#FFF3E0',
          px: { xs: 4, md: 8 }, // more breathing room
          py: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, ml: { md: 2 } }}>
          <Typography fontWeight={700} sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, color: '#E65100', mb: 2 }}>
            Lorem Ipsum Dolor
          </Typography>
          <Typography sx={{ mb: 3, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utla.
          </Typography>
          <Button
            onClick={() => navigate('/products/')}
            sx={{
              border: '2px solid #E65100',
              color: '#E65100',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#E65100',
                color: 'white',
              },
            }}
          >
            Shop Now
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src={mapImg}
            alt="Map"
            sx={{
              maxWidth: '100%',
              width: { xs: '60%', sm: '70%', md: '80%' },
              height: 'auto',
            }}
          />
        </Box>
      </Box>

      {/* Slide 2 */}
      <Box
        sx={{
          width: '100vw',
          flexShrink: 0,
          backgroundColor: '#fff',
          px: { xs: 4, md: 8 },
          py: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            mx: 'auto',
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, mb: 1, color: '#294122' }}>Since 2024</Typography>
          <Typography sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: '#416037' }}>
            For UT Students
          </Typography>
          <Typography sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: '#416037', mb: 2 }}>
            By UT Students
          </Typography>
          <Typography sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, fontWeight: 400, color: '#294122' }}>
            Welcome to UT GYUL — your exclusive, student-only marketplace! Designed specifically for UT students,
            UT GYUL makes buying, selling, and exchanging items on campus safe, simple, and convenient.
          </Typography>
        </Box>
      </Box>
    </Box>

        {/* Arrows */}
        <Button onClick={prevHero} sx={{ position: 'absolute', top: '50%', left: 16, color: '#E65100' }}>
          &#10094;
        </Button>
        <Button onClick={nextHero} sx={{ position: 'absolute', top: '50%', right: 16, color: '#E65100' }}>
          &#10095;
        </Button>
      </Box>

      {/* Category Grid */}
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Card
                onClick={() => navigate(`/products?category=${cat.name.replace(/\s+/g, '+')}`)}
                sx={{
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#FFF8F0',
                  borderRadius: 3,
                  boxShadow: 1,
                  '&:hover': { boxShadow: 4 },
                }}
              >
                <Icon sx={{ fontSize: '2rem', color: '#FF6F00', mb: 1 }}>{cat.icon}</Icon>
                <Typography variant="body1" fontWeight={500} sx={{ color: '#E65100' }}>
                  {cat.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Most Liked Products */}
      <Box sx={{ backgroundColor: '#FFF3E0', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} sx={{ color: '#E65100', mb: 4, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
            Most Liked Products
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
          {likedProducts.map((product, i) => (
            <Card
              key={i}
              onClick={() => navigate(`/product/${product.id}`)}
              sx={{
                width: { xs: '80%', sm: '45%', md: 200 },
                borderRadius: 2,
                boxShadow: 1,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 160, objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                image={product.image || placeholderImg}
                alt={product.name}
              />
              <CardContent>
                <Typography fontWeight={600}>{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">${product.price}</Typography>
                <Typography variant="caption" color="text.secondary">Likes: {product.popularity}</Typography>
              </CardContent>
            </Card>
          ))}
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;