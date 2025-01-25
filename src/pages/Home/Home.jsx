import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import '../../assets/styles/Home.css'
const Home = () => {
  return (
    <div className="home-container">
      <Navbar/>
      <h1>Welcome to UT Carrot</h1>
      <Footer />
    </div>
  )
}

export default Home
