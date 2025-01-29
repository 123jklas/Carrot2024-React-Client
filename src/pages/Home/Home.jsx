import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const Slider = () => {
  const slides = [
    {
      image: require('../../assets/images/shopping.png'),
      text: 'NEW COLLECTION',
    },
    {
      image: require('../../assets/images/sublease_image.png'),
      text: 'SUMMER SALE',
    },
    {
      image: require('../../assets/images/pochako.png'),
      text: 'POCHAKO',
    },
  ];

  const backgroundColors = ['#BFD8AF', '#8E7F7F', '#D3E4CD']; // Add your desired background colors here

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      className="slider-container"
      sx={{
        position: 'relative',
        width: '100%',
        height: 600,
        margin: '0 auto',
        backgroundColor: backgroundColors[currentIndex], // Change background color based on current slide index
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Button
        className="slider-arrow left-arrow"
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
          color: '#d55a24',
          left: 10,
        }}
      >
        &#10094;
      </Button>
      <Box
        className="slider-content"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography
          className="slider-text"
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#294122',
            marginRight: 10,
          }}
        >
          {slides[currentIndex].text}
        </Typography>
        <img
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image"
          style={{
            width: 300,
            height: 300,
            objectFit: 'cover',
            borderRadius: 10,
            transition: 'transform 1s ease-in-out',
          }}
        />
      </Box>
      <Button
        className="slider-arrow right-arrow"
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
          color: '#d55a24',
          right: 10,
        }}
      >
        &#10095;
      </Button>
    </Box>
  );
};
const Introduction = () => {
  return (
    <Box className="intro-container" sx={{ width: '100%', maxWidth: 1400, textAlign: 'left', color: '#294122', fontFamily: 'Rubik, sans-serif', marginBottom: 4 }}>
      <Typography className="intro-since" sx={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: 1 }}>Since 2024</Typography>
      <Typography className="intro-heading" sx={{ fontSize: '3rem', fontWeight: 700, margin: '5px 0 0 0', color: '#416037' }}>FOR UT STUDENTS</Typography>
      <Typography className="intro-heading" sx={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 5px 0', color: '#416037' }}>BY UT STUDENTS</Typography>
      <Typography className="intro-text" sx={{ fontSize: '1.5rem', lineHeight: 1.2, fontWeight: 550, marginBottom: 3, color: '#416037' }}>
        Welcome to UT GYUL — your exclusive, student-only marketplace! Designed specifically for UT students, UT GYUL makes buying, selling, and exchanging items on campus safe, simple, and convenient. Whether you're looking for textbooks, dorm essentials, or event tickets, UT GYUL brings the UT community together for secure, student-to-student transactions. Say goodbye to hassle and hello to seamless, trusted trades with your fellow Longhorns.
      </Typography>
      <Button className="buy-now-button" sx={{ backgroundColor: '#1e3932', color: 'white', padding: '12px 24px', border: 'none', borderRadius: 1, cursor: 'pointer', fontSize: '1rem', fontFamily: 'Rubik, sans-serif', marginBottom: 2, '&:hover': { backgroundColor: '#145a32' } }}>BUY NOW</Button>
    </Box>
  );
};

const FeaturedProducts = () => {
  return (
    <Box className="featured-container" sx={{ width: '100%', maxWidth: 1200, textAlign: 'center', color: '#294122', fontFamily: 'Rubik, sans-serif', marginBottom: 4 }}>
      <Typography className="featured-heading" sx={{ fontSize: '3rem', fontWeight: 700, margin: '10px 0', color: '#416037' }}>Featured Products</Typography>
      <Box className="featured-products" sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
        {/* Add your featured products here */}
        <Card className="product-card" sx={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: 2, padding: 2, width: 200, textAlign: 'center', boxShadow: 1 }}>
          <CardMedia component="img" height="140" image="https://via.placeholder.com/200" alt="Product 1" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Product 1</Typography>
            <Typography variant="body2" color="text.secondary">Description of Product 1</Typography>
          </CardContent>
        </Card>
        <Card className="product-card" sx={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: 2, padding: 2, width: 200, textAlign: 'center', boxShadow: 1 }}>
          <CardMedia component="img" height="140" image="https://via.placeholder.com/200" alt="Product 2" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Product 2</Typography>
            <Typography variant="body2" color="text.secondary">Description of Product 2</Typography>
          </CardContent>
        </Card>
        <Card className="product-card" sx={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: 2, padding: 2, width: 200, textAlign: 'center', boxShadow: 1 }}>
          <CardMedia component="img" height="140" image="https://via.placeholder.com/200" alt="Product 3" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Product 3</Typography>
            <Typography variant="body2" color="text.secondary">Description of Product 3</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

const Home = () => {
  return (
    <Box className="home-container" sx={{ paddingTop: 8, fontFamily: 'Rubik, sans-serif', backgroundColor: '#FFEDD2' }}>
      <Navbar />
      <Slider />
      <Container className="content-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, padding: '0 20px' }}>
        <Box className="section section-introduction" sx={{ width: '100%', maxWidth: 1400, padding: '80px 0', margin: 0, backgroundColor: '#FFEDD2' }}>
          <Introduction />
        </Box>
        <Box className="section section-featured" sx={{ width: '100%', maxWidth: 1400, padding: '40px 0', margin: 0, backgroundColor: '#FFEDD2' }}>
          <FeaturedProducts />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;